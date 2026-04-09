import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useUser } from '../context/UserContext'

const COL_META = {
  interested: { label: 'Interested', color: 'var(--blue)'   },
  applying:   { label: 'Applying',   color: 'var(--amber)'  },
  submitted:  { label: 'Submitted',  color: 'var(--teal)'   },
  results:    { label: 'Results',    color: 'var(--purple)' },
}

const EMPTY_COLS = { interested: [], applying: [], submitted: [], results: [] }

export default function Tracker() {
  const { user } = useUser()
  const [columns, setColumns] = useState(EMPTY_COLS)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding]   = useState(false)
  const [saving, setSaving]   = useState(false)
  const [newApp, setNewApp]   = useState({
    title: '', org: '', status: 'interested', deadline: '', notes: '',
  })

  useEffect(() => {
  if (!user?.id) return
  fetchApplications()
}, [user?.id])

  const fetchApplications = async () => {
  setLoading(true)
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Tracker fetch error:', error.message)
      setColumns(EMPTY_COLS)
    } else if (data) {
      const grouped = { interested: [], applying: [], submitted: [], results: [] }
      data.forEach(app => {
        if (grouped[app.status]) grouped[app.status].push(app)
        else grouped.interested.push(app)
      })
      setColumns(grouped)
    }
  } catch (err) {
    console.error('Tracker error:', err)
    setColumns(EMPTY_COLS)
  }
  setLoading(false)
}

  const moveCard = async (card, newStatus) => {
    const noteParts = (card.notes || '').split('||')
    const updatedNotes = [
      noteParts[0] || card.title || '',
      noteParts[1] || card.deadline || '',
      noteParts[2] || '',
      card.resultType || '',
    ].join('||')

    await supabase
      .from('applications')
      .update({ status: newStatus, notes: updatedNotes })
      .eq('id', card.id)

    setColumns(prev => {
      const updated = { ...prev }
      Object.keys(updated).forEach(col => {
        updated[col] = updated[col].filter(c => c.id !== card.id)
      })
      updated[newStatus] = [{ ...card, status: newStatus, notes: updatedNotes }, ...updated[newStatus]]
      return updated
    })
  }

  const addApplication = async () => {
    if (!newApp.title || !newApp.org) return
    setSaving(true)

    const { data, error } = await supabase
      .from('applications')
      .insert({
        user_id:  user.id,
        status:   newApp.status,
        notes:    `${newApp.title}||${newApp.deadline}||${newApp.notes}||`,
        progress: 10,
      })
      .select()
      .single()

    if (!error && data) {
      const card = { ...data, title: newApp.title, org: newApp.org, deadline: newApp.deadline }
      setColumns(prev => ({
        ...prev,
        [newApp.status]: [card, ...prev[newApp.status]],
      }))
      setNewApp({ title: '', org: '', status: 'interested', deadline: '', notes: '' })
      setAdding(false)
    }
    setSaving(false)
  }

  const deleteCard = async (card) => {
    await supabase.from('applications').delete().eq('id', card.id)
    setColumns(prev => {
      const updated = { ...prev }
      Object.keys(updated).forEach(col => {
        updated[col] = updated[col].filter(c => c.id !== card.id)
      })
      return updated
    })
  }

  const parseCard = (card) => {
    const parts = (card.notes || '').split('||')
    return {
      ...card,
      title:      parts[0] || 'Untitled Application',
      org:        parts[0] || 'Unknown Org',
      deadline:   parts[1] || '',
      note:       parts[2] || '',
      resultType: parts[3] || null,
    }
  }

  const inputStyle = {
    width: '100%', padding: '9px 13px',
    border: '1.5px solid var(--border)', borderRadius: 9,
    fontSize: 12, fontFamily: 'Plus Jakarta Sans, sans-serif',
    color: 'var(--text)', background: 'var(--surface)', outline: 'none',
  }

  return (
    <div style={{ padding: '26px 30px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
              Application Tracker
            </h2>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'var(--amber-light)', color: 'var(--amber)',
              border: '1px solid rgba(252,211,77,0.3)',
              fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
            }}>✦ Live Data</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3 }}>
            Your applications save automatically to your account
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--blue)', color: '#fff',
            border: 'none', padding: '9px 18px', borderRadius: 9,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
          + Add Application
        </button>
      </div>

      {/* Add Application Form */}
      {adding && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 16, padding: 24, marginBottom: 22,
        }}>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
            Add New Application
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 5 }}>
                Position Title *
              </label>
              <input
                style={inputStyle} placeholder="Software Engineering Intern"
                value={newApp.title} onChange={e => setNewApp({ ...newApp, title: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 5 }}>
                Organization *
              </label>
              <input
                style={inputStyle} placeholder="NASA JPL"
                value={newApp.org} onChange={e => setNewApp({ ...newApp, org: e.target.value })}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 5 }}>
                Status
              </label>
              <select
                style={{ ...inputStyle, cursor: 'pointer' }}
                value={newApp.status} onChange={e => setNewApp({ ...newApp, status: e.target.value })}>
                {Object.entries(COL_META).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 5 }}>
                Deadline
              </label>
              <input
                style={inputStyle} type="date"
                value={newApp.deadline} onChange={e => setNewApp({ ...newApp, deadline: e.target.value })}
              />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 5 }}>
              Notes (optional)
            </label>
            <input
              style={inputStyle} placeholder="Any notes about this application..."
              value={newApp.notes} onChange={e => setNewApp({ ...newApp, notes: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              onClick={() => setAdding(false)}
              style={{
                padding: '8px 18px', borderRadius: 9, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', border: '1.5px solid var(--border)',
                background: 'transparent', color: 'var(--text2)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
              Cancel
            </button>
            <button
              onClick={addApplication}
              disabled={saving || !newApp.title || !newApp.org}
              style={{
                padding: '8px 18px', borderRadius: 9, fontSize: 13, fontWeight: 700,
                cursor: saving || !newApp.title || !newApp.org ? 'not-allowed' : 'pointer',
                border: 'none',
                background: saving || !newApp.title || !newApp.org ? 'var(--border)' : 'var(--blue)',
                color: saving || !newApp.title || !newApp.org ? 'var(--text3)' : '#fff',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
              {saving ? 'Saving...' : 'Add Application'}
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text2)' }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>⏳</div>
          Loading your applications...
        </div>
      ) : (

        /* Kanban Board */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {Object.entries(columns).map(([colKey, cards]) => {
            const meta = COL_META[colKey]
            return (
              <div key={colKey} style={{ background: 'var(--surface3)', borderRadius: 14, padding: 13 }}>

                {/* Column Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 700, color: meta.color }}>
                    {meta.label}
                  </span>
                  <span style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, color: 'var(--text2)',
                  }}>{cards.length}</span>
                </div>

                {/* Cards */}
                {cards.map(rawCard => {
                  const card = parseCard(rawCard)
                  return (
                    <div key={card.id} style={{
                      background: 'var(--surface)', border: '1px solid var(--border)',
                      borderRadius: 12, padding: 13, marginBottom: 9,
                    }}>
                      {/* Title + Org */}
                      <div style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>
                        {card.title}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text2)', marginBottom: 8 }}>
                        {card.org}
                      </div>

                      {/* Deadline */}
                      {card.deadline && (
                        <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 8 }}>
                          🕐 {card.deadline}
                        </div>
                      )}

                      {/* Result Badge */}
                      {card.resultType && (
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20, marginBottom: 8,
                          background: card.resultType === 'accepted' ? 'var(--green-light)' : 'var(--red-light)',
                          color: card.resultType === 'accepted' ? 'var(--green)' : 'var(--red)',
                        }}>
                          {card.resultType === 'accepted' ? '✓ Accepted' : '✗ Rejected'}
                        </div>
                      )}

                     {/* Result Badge — clickable to change */}
{card.resultType && colKey === 'results' && (
  <div style={{ marginBottom: 8 }}>
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20, marginBottom: 6,
      background: card.resultType === 'accepted' ? 'var(--green-light)' : 'var(--red-light)',
      color: card.resultType === 'accepted' ? 'var(--green)' : 'var(--red)',
    }}>
      {card.resultType === 'accepted' ? '✓ Accepted' : '✗ Rejected'}
    </div>
    <div style={{ display: 'flex', gap: 4 }}>
      <button
        onClick={() => moveCard({ ...card, resultType: 'accepted' }, 'results')}
        style={{
          padding: '2px 7px', borderRadius: 6, fontSize: 9, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
          border: '1px solid var(--green)',
          background: card.resultType === 'accepted' ? 'var(--green)' : 'transparent',
          color: card.resultType === 'accepted' ? '#fff' : 'var(--green)',
        }}>
        ✓ Accepted
      </button>
      <button
        onClick={() => moveCard({ ...card, resultType: 'rejected' }, 'results')}
        style={{
          padding: '2px 7px', borderRadius: 6, fontSize: 9, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
          border: '1px solid var(--red)',
          background: card.resultType === 'rejected' ? 'var(--red)' : 'transparent',
          color: card.resultType === 'rejected' ? '#fff' : 'var(--red)',
        }}>
        ✗ Rejected
      </button>
    </div>
  </div>
)}
                      {/* Progress Bar */}
                      <div style={{ height: 3, borderRadius: 2, background: 'var(--border)', overflow: 'hidden', marginBottom: 8 }}>
                        <div style={{
                          height: '100%', borderRadius: 2,
                          background: colKey === 'results'
                            ? (card.resultType === 'accepted' ? 'var(--green)' : card.resultType === 'rejected' ? 'var(--red)' : meta.color)
                            : 'var(--green)',
                          width: colKey === 'interested' ? '15%' : colKey === 'applying' ? '45%' : colKey === 'submitted' ? '80%' : '100%',
                        }} />
                      </div>

                      {/* Delete */}
                      <button onClick={() => deleteCard(card)}
                        style={{
                          fontSize: 10, color: 'var(--text3)', background: 'none',
                          border: 'none', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif',
                        }}>
                        🗑 Remove
                      </button>
                    </div>
                  )
                })}

                {/* Add Button */}
                <button
                  onClick={() => { setNewApp(p => ({ ...p, status: colKey })); setAdding(true) }}
                  style={{
                    width: '100%', padding: 9, borderRadius: 9,
                    border: '1.5px dashed var(--border)', background: 'transparent',
                    color: 'var(--text3)', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)' }}
                >
                  + Add
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}