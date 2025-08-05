import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

const baseURL = 'http://localhost:3001/api'

// --- Login Page with Register modal ---
function LoginPage({ setUserId }: { setUserId: (id: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showRegister, setShowRegister] = useState(false)

  // Register form states
  const [regUsername, setRegUsername] = useState('')
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regError, setRegError] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${baseURL}/auth/login`, { username, password })
      const id = res.data.userId
      if (id) {
        localStorage.setItem('userId', id.toString())
        setUserId(id.toString())
        navigate('/timeline')
      } else {
        alert('Login failed: No userId returned')
      }
    } catch (err) {
      alert('Login failed. Check credentials.')
    }
  }

  const handleRegister = async () => {
    setRegError('')
    try {
      await axios.post(`${baseURL}/auth/register`, {
        username: regUsername,
        name: regName,
        email: regEmail,
        password: regPassword,
      })
      alert('Registration successful! Please log in.')
      setShowRegister(false)
      setRegUsername('')
      setRegName('')
      setRegEmail('')
      setRegPassword('')
    } catch (error: any) {
      if (error.response?.data?.message) {
        setRegError(error.response.data.message)
      } else {
        setRegError('Registration failed')
      }
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: 10 }}
      />
      <button onClick={handleLogin} style={{ marginRight: 10 }}>
        Login
      </button>
      <button onClick={() => setShowRegister(true)}>Register</button>

      {showRegister && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 8,
              minWidth: 300,
            }}
          >
            <h3>Register</h3>
            <input
              placeholder="Username"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
              style={{ display: 'block', marginBottom: 10, width: '100%' }}
            />
            <input
              placeholder="Name"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              style={{ display: 'block', marginBottom: 10, width: '100%' }}
            />
            <input
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              style={{ display: 'block', marginBottom: 10, width: '100%' }}
            />
            <input
              placeholder="Password"
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              style={{ display: 'block', marginBottom: 10, width: '100%' }}
            />

            {regError && (
              <p style={{ color: 'red', marginBottom: 10 }}>{regError}</p>
            )}

            <button onClick={handleRegister} style={{ marginRight: 10 }}>
              Register
            </button>
            <button onClick={() => setShowRegister(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Timeline Page ---
function TimelinePage({ userId }: { userId: string }) {
  const [murmurs, setMurmurs] = useState<any[]>([])
  const [likesCount, setLikesCount] = useState<Record<number, number>>({})
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())
  const [newMurmurText, setNewMurmurText] = useState('')

  const navigate = useNavigate()

  // Fetch timeline murmurs for this user
  const fetchTimeline = async () => {
    try {
      const res = await axios.get(`${baseURL}/getTimelineByUserId/${userId}?page=1`)
      setMurmurs(res.data)

      // Fetch like counts for each murmur
      const counts: Record<number, number> = {}
      await Promise.all(
        res.data.map(async (murmur: any) => {
          const countRes = await axios.get(`${baseURL}/countMurmurLikes/${murmur.id}`)
          counts[murmur.id] = countRes.data || 0
        })
      )
      setLikesCount(counts)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTimeline()
  }, [])

  const handleLike = async (murmurId: number) => {
    try {
      await axios.post(`${baseURL}/likeMurmurByUserId/${murmurId}?userId=${userId}`)
      setLikedIds(prev => new Set(prev).add(murmurId))
      setLikesCount((prev) => ({
        ...prev,
        [murmurId]: (prev[murmurId] || 0) + 1,
      }))
    } catch (err) {
      console.error(err)
    }
  }

  const handlePost = async () => {
    if (!newMurmurText.trim()) return
    try {
      await axios.post(`${baseURL}/createMurmur`, {
        text: newMurmurText.trim(),
        userId: Number(userId),
      })
      setNewMurmurText('')
      fetchTimeline()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Timeline</h1>
        <button onClick={() => navigate('/myprofile')} style={{ height: 30 }}>
          My Profile
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <textarea
          value={newMurmurText}
          onChange={(e) => setNewMurmurText(e.target.value)}
          rows={3}
          style={{ width: '100%', padding: 8, fontSize: 14 }}
          placeholder="What's on your mind?"
        />
        <button onClick={handlePost} style={{ marginTop: 5 }}>
          Post
        </button>
      </div>

      {murmurs.length === 0 ? (
        <p>No murmurs to show.</p>
      ) : (
        murmurs.map((murmur) => (
          <div
            key={murmur.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <p><strong>{murmur.user.name}</strong> (@{murmur.user.username})</p>
            <p>{murmur.text}</p>
            <p style={{ fontSize: 12, color: '#555' }}>
              {new Date(murmur.createdAt).toLocaleString()}
            </p>

            <div>
              <span>Likes: {likesCount[murmur.id] || 0}</span>
              {!likedIds.has(murmur.id) && (
                <button
                  onClick={() => handleLike(murmur.id)}
                  style={{ marginLeft: 10 }}
                >
                  Like
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

// --- MyProfile Page ---
function MyProfilePage({ userId }: { userId: string }) {
  const [user, setUser] = useState<any>(null)
  const [murmurs, setMurmurs] = useState<any[]>([])
  const [following, setFollowing] = useState<any[]>([])
  const [followers, setFollowers] = useState<any[]>([])

  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [modalSource, setModalSource] = useState<"following" | "followers" | null>(null)

  const fetchData = async () => {
    const userRes = await axios.get(`${baseURL}/findOneUser/${userId}`)
    setUser(userRes.data)

    const murmurRes = await axios.get(`${baseURL}/getUserMurmursByUserId/${userId}?page=1`)
    setMurmurs(murmurRes.data)

    const followingRes = await axios.get(`${baseURL}/followingByUserId/${userId}`)
    setFollowing(followingRes.data)

    const followersRes = await axios.get(`${baseURL}/followersByUserId/${userId}`)
    setFollowers(followersRes.data)
  }

  const handleDelete = async (id: number) => {
    await axios.delete(`${baseURL}/deleteMurmur/${id}?userId=${userId}`)
    fetchData()
  }

  const openUserModal = async (id: number, source: "following" | "followers") => {
    const res = await axios.get(`${baseURL}/findOneUser/${id}`)
    setSelectedUser(res.data)
    setModalSource(source)
  }

  const handleUnfollow = async () => {
    if (selectedUser) {
      await axios.delete(`${baseURL}/unfollowAUser/${selectedUser.id}?userId=${userId}`)
      closeModal()
      fetchData()
    }
  }

  const handleFollow = async () => {
    if (selectedUser) {
      await axios.post(`${baseURL}/followAUser/${selectedUser.id}?userId=${userId}`)
      closeModal()
      fetchData()
    }
  }

  const closeModal = () => {
    setSelectedUser(null)
    setModalSource(null)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!user) return <p>Loading profile...</p>

  return (
    <div style={{ padding: 20 }}>
      <h2>My Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3>My Murmurs</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {murmurs.map((murmur) => (
          <li
            key={murmur.id}
            style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}
          >
            <p>{murmur.text}</p>
            <button onClick={() => handleDelete(murmur.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Following</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {following.map((u) => (
          <li
            key={u.id}
            onClick={() => openUserModal(u.id, "following")}
            style={{ cursor: 'pointer', color: 'blue', marginBottom: 5 }}
          >
            <strong>{u.username}</strong> ({u.name})
          </li>
        ))}
      </ul>

      <h3>Followers</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {followers.map((u) => (
          <li
            key={u.id}
            onClick={() => openUserModal(u.id, "followers")}
            style={{ cursor: 'pointer', color: 'blue', marginBottom: 5 }}
          >
            <strong>{u.username}</strong> ({u.name})
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              padding: 20,
              borderRadius: 10,
              minWidth: 300,
              position: 'relative',
            }}
          >
            <h3>User Details</h3>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>

            {modalSource === "following" && (
              <button
                onClick={handleUnfollow}
                style={{ marginTop: 10, marginRight: 10, backgroundColor: 'red', color: 'white' }}
              >
                Unfollow
              </button>
            )}

            {modalSource === "followers" && (
              <button
                onClick={handleFollow}
                style={{ marginTop: 10, marginRight: 10, backgroundColor: 'green', color: 'white' }}
              >
                Follow
              </button>
            )}

            <button onClick={closeModal} style={{ marginTop: 10 }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Main App ---
function App() {
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'))

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage setUserId={(id) => setUserId(id)} />}
      />
      <Route
        path="/timeline"
        element={
          userId ? (
            <TimelinePage userId={userId} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/myprofile"
        element={
          userId ? (
            <MyProfilePage userId={userId} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to={userId ? '/timeline' : '/login'} />} />
    </Routes>
  )
}

export default App
