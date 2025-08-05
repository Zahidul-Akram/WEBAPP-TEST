import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const baseURL = 'http://localhost:3001/api'

function LoginPage({ setUserId }: { setUserId: (id: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

function TimelinePage({ userId }: { userId: string }) {
  const [murmurs, setMurmurs] = useState<any[]>([])
  const [likeCounts, setLikeCounts] = useState<{ [id: number]: number }>({})
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const fetchTimeline = async () => {
    const res = await axios.get(`${baseURL}/getTimelineByUserId/${userId}?page=1`)
    setMurmurs(res.data)

    const counts: { [id: number]: number } = {}
    for (const murmur of res.data) {
      const countRes = await axios.get(`${baseURL}/countMurmurLikes/${murmur.id}`)
      counts[murmur.id] = countRes.data
    }
    setLikeCounts(counts)
  }

  useEffect(() => {
    fetchTimeline()
  }, [])

  const handleLike = async (id: number) => {
    await axios.post(`${baseURL}/likeMurmurByUserId/${id}?userId=${userId}`)
    fetchTimeline()
  }

  const handlePost = async () => {
    if (!text.trim()) return
    await axios.post(`${baseURL}/createMurmur`, { text, userId })
    setText('')
    fetchTimeline()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Timeline</h2>
        <button onClick={() => navigate('/myprofile')}>My Profile</button>
      </div>

      <div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write something..." />
        <button onClick={handlePost}>Post</button>
      </div>

      <ul>
        {murmurs.map((murmur) => (
          <li key={murmur.id} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
            <p><strong>{murmur.user.username}</strong>: {murmur.text}</p>
            <p>Likes: {likeCounts[murmur.id] || 0}</p>
            <button onClick={() => handleLike(murmur.id)}>Like</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

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
    <div>
      <h2>My Profile</h2>
      <p>Username: {user.username}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <h3>My Murmurs</h3>
      <ul>
        {murmurs.map((murmur) => (
          <li key={murmur.id} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
            <p>{murmur.text}</p>
            <button onClick={() => handleDelete(murmur.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Following</h3>
      <ul>
        {following.map((user) => (
          <li
            key={user.id}
            onClick={() => openUserModal(user.id, "following")}
            style={{ cursor: 'pointer', color: 'blue' }}
          >
            <strong>{user.username}</strong> ({user.name})
          </li>
        ))}
      </ul>

      <h3>Followers</h3>
      <ul>
        {followers.map((user) => (
          <li
            key={user.id}
            onClick={() => openUserModal(user.id, "followers")}
            style={{ cursor: 'pointer', color: 'blue' }}
          >
            <strong>{user.username}</strong> ({user.name})
          </li>
        ))}
      </ul>

      {selectedUser && (
  <div style={{
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
  }}>
    <div style={{ background: '#fff', padding: 20, borderRadius: 10, minWidth: 300 }}>
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

      <button onClick={closeModal} style={{ marginTop: 10 }}>Close</button>
    </div>
  </div>
)}

    </div>
  )
}



export default function App() {
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'))

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setUserId={setUserId} />} />
      <Route path="/timeline" element={userId ? <TimelinePage userId={userId} /> : <LoginPage setUserId={setUserId} />} />
      <Route path="/myprofile" element={userId ? <MyProfilePage userId={userId} /> : <LoginPage setUserId={setUserId} />} />
      <Route path="*" element={<LoginPage setUserId={setUserId} />} />
    </Routes>
  )
}








