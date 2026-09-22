import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Bell, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Download, FileText, FolderKanban, Gauge, HelpCircle, Info, LayoutDashboard, Menu, MoreHorizontal, Pencil, Search, Settings, SlidersHorizontal, Users, X } from 'lucide-react'
import './App.css'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/companies', label: 'Companies' },
  { to: '/contacts', label: 'Contacts' },
  { to: '/deals', label: 'Deals' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/automation', label: 'Automation' },
  { to: '/ai-insights', label: 'AI insights' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/reports', label: 'Reports' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/inbox', label: 'Inbox' },
  { to: '/workspace', label: 'Workspace' },
  { to: '/settings', label: 'Settings' },
]

const metricCards = [
  { label: 'Revenue', value: '$3.4M', change: '+18.2%', tone: 'green' },
  { label: 'New leads', value: '381', change: '+11.4%', tone: 'blue' },
  { label: 'Win rate', value: '47.8%', change: '+3.1%', tone: 'violet' },
  { label: 'Renewals', value: '92%', change: '+6.7%', tone: 'amber' },
]

const revenueSeries = [
  { month: 'Jan', revenue: 1200, target: 980 },
  { month: 'Feb', revenue: 1450, target: 1100 },
  { month: 'Mar', revenue: 1320, target: 1180 },
  { month: 'Apr', revenue: 1680, target: 1250 },
  { month: 'May', revenue: 1790, target: 1360 },
  { month: 'Jun', revenue: 1940, target: 1480 },
  { month: 'Jul', revenue: 2100, target: 1600 },
  { month: 'Aug', revenue: 2250, target: 1720 },
]

const pipelineBreakdown = [
  { name: 'Enterprise', value: 46 },
  { name: 'Mid-market', value: 32 },
  { name: 'SMB', value: 22 },
]

const dealRows = [
  { name: 'Northstar Labs', stage: 'Proposal', value: '$184K', owner: 'Maya', status: 'At risk' },
  { name: 'Vertex Health', stage: 'Negotiation', value: '$96K', owner: 'Iris', status: 'Healthy' },
  { name: 'Aster Finance', stage: 'Pending', value: '$128K', owner: 'Theo', status: 'Healthy' },
  { name: 'Lumen Studio', stage: 'Renewal', value: '$42K', owner: 'Maya', status: 'Needs review' },
]

const companyRows = [
  { company: 'Northstar Labs', segment: 'Technology', health: 'Healthy', value: '$184K', owner: 'Maya' },
  { company: 'Vertex Health', segment: 'Healthcare', health: 'Growing', value: '$96K', owner: 'Iris' },
  { company: 'Aster Finance', segment: 'Fintech', health: 'Healthy', value: '$128K', owner: 'Theo' },
  { company: 'Morrow & Co.', segment: 'Consumer', health: 'Growing', value: '$61K', owner: 'Iris' },
]

const contactRows = [
  { name: 'Sam Okafor', role: 'VP Product', company: 'Northstar', status: 'Champion' },
  { name: 'Ava Martinez', role: 'Director of IT', company: 'Vertex', status: 'Decision maker' },
  { name: 'Kai Brooks', role: 'CFO', company: 'Aster', status: 'Champion' },
  { name: 'Ravi Nair', role: 'COO', company: 'Lumen', status: 'Needs follow-up' },
]

const leadRows = [
  { name: 'Olivia Chen', email: 'olivia.chen@northstar.io', company: 'Northstar Labs', source: 'Inbound', score: 96, status: 'Qualified', owner: 'Maya' },
  { name: 'Marcus Rivera', email: 'marcus@vertexhealth.com', company: 'Vertex Health', source: 'Partner', score: 93, status: 'Contacted', owner: 'Iris' },
  { name: 'Priya Shah', email: 'priya@asterfinance.com', company: 'Aster Finance', source: 'Outbound', score: 91, status: 'Qualified', owner: 'Theo' },
  { name: 'Lena Torres', email: 'lena@morrow.co', company: 'Morrow & Co.', source: 'Events', score: 78, status: 'New', owner: 'Maya' },
]

const taskRows = [
  { task: 'Prepare expansion deck', assignee: 'Maya', due: 'Today', priority: 'High' },
  { task: 'Review onboarding milestones', assignee: 'Theo', due: 'Tue', priority: 'Medium' },
  { task: 'Schedule QBR with Aster', assignee: 'Iris', due: 'Wed', priority: 'High' },
]

const reportRows = [
  { name: 'Pipeline coverage', owner: 'Ops', updated: '2h ago' },
  { name: 'Customer health index', owner: 'CS', updated: '4h ago' },
  { name: 'Renewal risk watchlist', owner: 'Success', updated: 'Today' },
]

const automationRows = [
  { name: 'New lead enrichment', trigger: 'Lead created', action: 'Enrich + assign owner', runs: '184', status: 'Active' },
  { name: 'Renewal risk alert', trigger: 'Health score < 65', action: 'Notify account team', runs: '28', status: 'Active' },
  { name: 'Deal follow-up', trigger: 'No activity for 5 days', action: 'Create task', runs: '46', status: 'Paused' },
]

const calendarRows = [
  { time: '09:30', title: 'Revenue standup', type: 'Internal', owner: 'Maya' },
  { time: '11:00', title: 'Northstar QBR', type: 'Customer', owner: 'Maya' },
  { time: '14:30', title: 'Pipeline review', type: 'Forecast', owner: 'Theo' },
  { time: '16:00', title: 'Vertex onboarding', type: 'Customer', owner: 'Iris' },
]

const inboxRows = [
  { sender: 'Sam Okafor', subject: 'Expansion timeline', preview: 'We are ready to align on the EMEA rollout...', age: '12m', unread: true },
  { sender: 'Ava Martinez', subject: 'Analytics pilot', preview: 'Could we review the implementation options?', age: '1h', unread: true },
  { sender: 'Lena Torres', subject: 'Milestone update', preview: 'The first value milestone is now complete.', age: '3h', unread: false },
]

const leadInsights = [
  { name: 'Olivia Chen', email: 'olivia.chen@northstar.io', company: 'Northstar Labs', score: 96, note: 'Reach out today — product usage suggests an expansion conversation.' },
  { name: 'Marcus Rivera', email: 'marcus@vertexhealth.com', company: 'Vertex Health', score: 93, note: 'Share the analytics case study and invite Marcus to a pilot review.' },
  { name: 'Priya Shah', email: 'priya@asterfinance.com', company: 'Aster Finance', score: 91, note: 'Champion activity is high; ask for an introduction to the finance team.' },
]

const dealRisks = [
  { name: 'Lumen Studio renewal', value: '$42,000', stage: 'Discovery', score: 28, risk: 'HIGH' },
  { name: 'Northstar EMEA expansion', value: '$184,000', stage: 'Proposal', score: 74, risk: 'LOW' },
  { name: 'Vertex analytics pilot', value: '$96,500', stage: 'Discovery', score: 48, risk: 'HIGH' },
  { name: 'Aster Finance platform', value: '$128,000', stage: 'Won', score: 96, risk: 'LOW' },
]

const channelPerformance = [
  { name: 'Inbound', value: 36 },
  { name: 'Partner', value: 25 },
  { name: 'Outbound', value: 19 },
  { name: 'Events', value: 20 },
]

const leadVelocity = [
  { day: 'Mon', leads: 12 },
  { day: 'Tue', leads: 18 },
  { day: 'Wed', leads: 22 },
  { day: 'Thu', leads: 16 },
  { day: 'Fri', leads: 28 },
  { day: 'Sat', leads: 14 },
]

const PIE_COLORS = ['#7ad9ff', '#ae9cff', '#f4c07d', '#72d6a5']
const pivoraRevenue = [
  { month: 'Mar', value: 1200 }, { month: 'Apr', value: 1800 }, { month: 'May', value: 1450 },
  { month: 'Jun', value: 2450 }, { month: 'Jul', value: 1900 }, { month: 'Aug', value: 2800 },
  { month: 'Sep', value: 2200 }, { month: 'Oct', value: 3200 }, { month: 'Nov', value: 2700 },
  { month: 'Dec', value: 3800 }, { month: 'Jan', value: 3400 }, { month: 'Feb', value: 4300 },
]
const retentionSeries = [
  { month: 'Jun', SMEs: 20, Startups: 25, Enterprises: 32 },
  { month: 'Jul', SMEs: 25, Startups: 30, Enterprises: 38 },
  { month: 'Aug', SMEs: 23, Startups: 35, Enterprises: 42 },
  { month: 'Sep', SMEs: 30, Startups: 32, Enterprises: 44 },
  { month: 'Oct', SMEs: 35, Startups: 38, Enterprises: 48 },
  { month: 'Nov', SMEs: 31, Startups: 44, Enterprises: 52 },
  { month: 'Dec', SMEs: 40, Startups: 48, Enterprises: 58 },
]

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')
  const [query, setQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const currentTitle =
    navItems.find((item) => item.to === location.pathname)?.label || 'Dashboard'

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        document.querySelector('.global-search input, .ai-search input')?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  if (location.pathname === '/login') {
    return <LoginPage />
  }

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }
  const openDetail = (title, body) => setModal({ kind: 'detail', title, body })

  const exportPage = () => {
    const csv = `orangi CRM export\nPage,${currentTitle}\nGenerated,${new Date().toISOString()}\n`
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `${currentTitle.toLowerCase().replace(/\s+/g, '-')}-export.csv`
    link.click()
    URL.revokeObjectURL(url)
    notify('Export downloaded')
  }

  return (
    <div className={`crm-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-mark"><Gauge size={17} /></div>
          <div className="brand-name">orangi CRM</div>
          <button className="collapse-button" aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setSidebarCollapsed((value) => !value)}><ChevronLeft size={16} /></button>
        </div>
        <div className="profile-wrap"><button className="profile-switcher" aria-expanded={profileOpen} onClick={() => setProfileOpen((value) => !value)}><span className="avatar">O</span><span><strong>orangi</strong><small>Workspace owner</small></span><ChevronDown size={15} /></button>{profileOpen && <div className="profile-menu"><button onClick={() => { setProfileOpen(false); notify('Profile opened') }}>View profile</button><button onClick={() => { setProfileOpen(false); notify('Workspace switcher opened') }}>Switch workspace</button></div>}</div>
        <div className="side-section-title">Main menu</div>
        <nav className="nav">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}><LayoutDashboard size={16} /> Dashboard</NavLink>
          <NavLink to="/leads" className="nav-link"><Users size={16} /> Leads</NavLink>
          <NavLink to="/deals" className="nav-link"><FolderKanban size={16} /> Deals</NavLink>
          <NavLink to="/reports" className="nav-link"><FileText size={16} /> Notes</NavLink>
          <NavLink to="/calendar" className="nav-link"><CalendarDays size={16} /> Calendar</NavLink>
          <NavLink to="/reports" className="nav-link"><Gauge size={16} /> Reports</NavLink>
          <NavLink to="/workspace" className="nav-link"><FolderKanban size={16} /> Projects</NavLink>
        </nav>
        <div className="side-section-title favorites-title"><span>Favorites</span><ChevronDown size={14} /></div>
        <div className="favorite-list"><NavLink to="/companies" className="favorite-link"><span><Users size={15} /> Companies</span><b>1,212</b></NavLink><NavLink to="/contacts" className="favorite-link"><span><Users size={15} /> Contacts</span><b>898</b></NavLink><NavLink to="/calendar" className="favorite-link"><span><CalendarDays size={15} /> Meetings</span><b>32</b></NavLink></div>
        <div className="side-section-title projects-title">Projects</div>
        <div className="storage-widget"><div className="storage-heading"><span>Cloud Storage</span><b>90%</b></div><div className="storage-bar"><i /></div><p>Upgrade your storage to keep your workspace growing.</p><button onClick={() => notify('Upgrade options opened')}>Upgrade Storage</button></div>
        <div className="bottom-links"><NavLink to="/settings"><Settings size={15} /> Settings</NavLink><NavLink to="/workspace"><CircleHelp size={15} /> Help Center</NavLink></div>
        <div className="sidebar-footer">
          <div className="avatar">MC</div><div><div className="user-name">Maya Chen</div><div className="user-role">Revenue operations</div></div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="breadcrumb" aria-label="Breadcrumb">
            <span>CRM</span><span className="breadcrumb-separator">&gt;</span><strong>{currentTitle === 'AI insights' ? 'Ai insights' : currentTitle}</strong>
          </div>
          <div className="topbar-actions">
            <button className="primary-button task-button" onClick={() => setModal('task')}>+ Task</button>
            <label className="global-search"><span>⌕</span><input aria-label="Search" placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && notify(`Searching for “${query}”`)} /><kbd>⌘ K</kbd></label>
            <button className="icon-button" aria-label="Settings" onClick={() => navigate('/settings')}>⚙</button>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setModal('notifications')}>🔔<span className="notification-badge">4</span></button>
          </div>
        </header>

        <div className="page-body">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DashboardPage onAction={notify} onExport={exportPage} navigate={navigate} />} />
            <Route path="/dashboard" element={<DashboardPage onAction={notify} onExport={exportPage} navigate={navigate} />} />
            <Route path="/companies" element={<CompaniesPage onOpen={openDetail} />} />
            <Route path="/leads" element={<LeadsPage onOpen={openDetail} onAdd={() => setModal('lead')} />} />
            <Route path="/contacts" element={<ContactsPage onOpen={openDetail} />} />
            <Route path="/deals" element={<DealsPage onOpen={openDetail} />} />
            <Route path="/tasks" element={<TasksPage onOpen={openDetail} />} />
            <Route path="/automation" element={<AutomationPage onAction={notify} />} />
            <Route path="/ai-insights" element={<AiInsightsPage onAction={notify} />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportsPage onOpen={openDetail} />} />
            <Route path="/calendar" element={<CalendarPage onOpen={openDetail} />} />
            <Route path="/inbox" element={<InboxPage onOpen={openDetail} />} />
            <Route path="/workspace" element={<WorkspacePage onAction={notify} />} />
            <Route path="/settings" element={<SettingsPage onAction={notify} />} />
          </Routes>
        </div>
      </main>
      {modal && <ActionModal type={modal} onClose={() => setModal(null)} onAction={notify} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const submit = (event) => {
    event.preventDefault()
    setMessage('Welcome back. Redirecting to your dashboard...')
    window.setTimeout(() => navigate('/'), 700)
  }

  return (
    <div className="login-page">
      <section className="login-branding">
        <div className="blob blob-one" />
        <div className="blob blob-two" />
        <div className="blob blob-three" />
        <div className="blob blob-four" />
        <div className="login-brand-logo"><span className="chart-logo"><i /><i /><i /></span><strong>orangi CRM</strong></div>
        <div className="brand-copy">
          <h1>Get Started<br />With Your <span>Account</span></h1>
          <p>smart insights, better decisions.</p>
        </div>
        <p className="branding-footer">Don't have account <button onClick={() => document.querySelector('.login-email')?.focus()}>Sign Up -&gt;</button></p>
      </section>
      <section className="login-form-pane">
        <div className="login-form-wrap">
          <div className="login-heading">
            <h2>Welcome Back</h2>
            <p>Log in to your account to continue</p>
          </div>
          <form onSubmit={submit} className="login-form">
            <label className="login-field"><span className="field-icon">➤</span><input className="login-email" type="email" required placeholder="Enter your Email Address" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
            <label className="login-field"><span className="field-icon">▣</span><input required type={showPassword ? 'text' : 'password'} placeholder="Enter your Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></label>
            <div className="login-options"><label className="remember-option"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span className="custom-check">✓</span>Remember me</label><button type="button" className="forgot-link" onClick={() => setMessage('Password reset instructions are on their way.')}>Forgot password?</button></div>
            <button className="login-submit" type="submit">Log in</button>
          </form>
          <div className="login-divider"><span>or continue with</span></div>
          <button className="google-button" onClick={() => setMessage('Google sign-in selected.')}><strong>G</strong>Continue With Google</button>
          {message && <p className="login-message">{message}</p>}
          <button type="button" className="skip-login" onClick={() => navigate('/')}>Skip for now</button>
          <p className="login-bottom">Don't have account <button onClick={() => document.querySelector('.login-email')?.focus()}>Sign Up -&gt;</button></p>
        </div>
      </section>
    </div>
  )
}

function ActionModal({ type, onClose, onAction }) {
  const isTask = type === 'task'
  const isLead = type === 'lead'
  const isDetail = typeof type === 'object' && type.kind === 'detail'
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-card" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <p className="eyebrow">{isTask || isLead ? 'Action' : isDetail ? 'Details' : 'Notifications'}</p>
        <h2>{isTask ? 'Create a task' : isLead ? 'Add a lead' : isDetail ? type.title : 'Notifications'}</h2>
        {isTask ? <form onSubmit={(event) => { event.preventDefault(); onClose(); onAction('Task created') }}><input className="modal-input" placeholder="Task name" autoFocus required /><select className="modal-input" defaultValue="Today"><option>Today</option><option>Tomorrow</option><option>This week</option></select><button className="primary-button modal-submit">Create task</button></form> : isLead ? <form onSubmit={(event) => { event.preventDefault(); onClose(); onAction('Lead added') }}><input className="modal-input" placeholder="Full name" autoFocus required /><input className="modal-input" type="email" placeholder="Email address" required /><input className="modal-input" placeholder="Company" required /><button className="primary-button modal-submit">Add lead</button></form> : isDetail ? <div className="notification-list"><p>{type.body}</p><button className="primary-button modal-submit" onClick={onClose}>Done</button></div> : <div className="notification-list"><p>Renewal risk alert · Lumen Studio</p><p>New reply · Ava Martinez</p><p>Expansion signal · Northstar Labs</p><button className="ghost-button" onClick={() => { onClose(); onAction('Notifications marked as read') }}>Mark all as read</button></div>}
      </div>
    </div>
  )
}

function DashboardPage({ onAction, onExport, navigate }) {
  const [activeRange, setActiveRange] = useState('1M')
  const [aiQuery, setAiQuery] = useState('')
  return (
    <div className="pivora-dashboard">
      <div className="pivora-header"><div><h1>08 Dashboard</h1><span className="updated"><span /> Last updated now</span></div><div className="pivora-actions"><label className="ai-search"><Search size={16} /><input aria-label="Search AI Mode" placeholder="Search AI Mode" value={aiQuery} onChange={(event) => setAiQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && onAction(`Searching for “${aiQuery || 'all insights'}”`)} /><kbd>⌘ K</kbd></label><button className="dashboard-icon-button" aria-label="Notifications" onClick={() => onAction('Notifications opened')}><Bell size={18} /><span>4</span></button><button className="dashboard-icon-button" aria-label="Settings" onClick={() => navigate('/settings')}><Settings size={18} /></button><button onClick={() => onAction('Widget editor opened')} className="secondary-action">Customize Widget</button><button onClick={() => onAction('Import dialog opened')} className="secondary-action">Imports</button><button onClick={onExport} className="purple-action"><Download size={15} /> Exports</button></div></div>
      <div className="pivora-kpis">{[['Leads', '129', '+2%', 'vs last week'], ['CLV', '14d', '-4%', 'vs last week'], ['Conversion Rate', '24%', '+2%', 'vs last week'], ['Revenue', '$1.4K', '-4%', 'vs last month']].map(([label, value, change, sub]) => <div className="pivora-kpi" key={label}><Info size={15} /><span>{label}</span><strong>{value}</strong><div className={change.startsWith('+') ? 'positive' : 'negative'}>{change} <em>{sub}</em></div></div>)}</div>
      <div className="pivora-grid pivora-middle"><div className="pivora-panel revenue-panel"><div className="widget-title"><div><h2>Revenue</h2><p>$32,209 <span className="positive">+22%</span> <small>vs last month</small></p></div><div className="time-filters">{['1D', '1W', '1M', '6M', '1Y', 'ALL'].map((item) => <button onClick={() => { setActiveRange(item); onAction(`Revenue range set to ${item}`) }} className={item === activeRange ? 'selected' : ''} key={item}>{item}</button>)}</div></div><div className="pivora-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={pivoraRevenue}><CartesianGrid stroke="#f0eef8" vertical={false} /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#9b98aa', fontSize: 11 }} /><YAxis hide /><Tooltip cursor={{ fill: '#f5f3ff' }} /><Bar dataKey="value" fill="#8174e8" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div></div><CalendarWidget onAction={onAction} /></div>
      <div className="pivora-grid pivora-bottom"><LeadsWidget onAction={onAction} /><CountryWidget onAction={onAction} /><RetentionWidget onAction={onAction} /></div>
    </div>
  )
}

function CalendarWidget({ onAction }) {
  const [monthOffset, setMonthOffset] = useState(0)
  const monthLabel = monthOffset === 0 ? 'October 2025' : monthOffset < 0 ? 'September 2025' : 'November 2025'
  return <div className="pivora-panel calendar-widget"><div className="widget-title"><div><h2>{monthLabel}</h2><p className="calendar-month">Monthly view</p></div><div className="calendar-controls"><button aria-label="Previous month" onClick={() => setMonthOffset((value) => Math.max(-1, value - 1))}><ChevronLeft size={16} /></button><button aria-label="Next month" onClick={() => setMonthOffset((value) => Math.min(1, value + 1))}><ChevronRight size={16} /></button></div></div><div className="mini-calendar"><div className="weekdays">{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => <span key={`${day}-${i}`}>{day}</span>)}</div><div className="days">{Array.from({ length: 35 }, (_, i) => <span className={i === 10 && monthOffset === 0 ? 'today' : ''} key={i}>{i < 3 ? '' : (i - 2 <= 31 ? i - 2 : '')}</span>)}</div></div><div className="agenda"><div className="agenda-item"><span className="agenda-dot purple" /><div><strong>Mesh Weekly Meeting</strong><small>9:00 am - 10:00 am · On Google Meet</small></div></div><div className="agenda-item"><span className="agenda-dot orange" /><div><strong>Gamification Demo</strong><small>10:45 am - 11:45 am · On Slack</small></div></div><button onClick={() => onAction('Calendar opened')} className="view-more">View calendar <ChevronRight size={14} /></button></div></div>
}

function LeadsWidget({ onAction }) {
  const [tab, setTab] = useState('Status')
  return <div className="pivora-panel leads-widget"><div className="widget-title"><div><h2>Leads Management</h2><p>Overview by {tab.toLowerCase()}</p></div><button className="widget-menu" aria-label="Lead widget options" onClick={() => onAction('Lead widget options opened')}><MoreHorizontal size={18} /></button></div><div className="tabs">{['Status', 'Sources', 'Qualification'].map((item) => <button onClick={() => { setTab(item); onAction(`${item} tab selected`) }} className={tab === item ? 'active' : ''} key={item}>{item}</button>)}</div><div className="lead-bars">{[['Qualified', 88], ['Contacted', 67], ['Lost', 40], ['Won', 56]].map(([label, width]) => <div className="lead-row" key={label}><span>{label}</span><div><i style={{ width: `${width}%` }} /></div><b>{width}</b></div>)}</div></div>
}

function CountryWidget({ onAction }) {
  return <div className="pivora-panel country-widget"><div className="widget-title"><div><h2>Top Country</h2><p>Lead distribution</p></div><button className="widget-menu" aria-label="Country widget options" onClick={() => onAction('Country widget options opened')}><MoreHorizontal size={18} /></button></div><div className="country-content"><div className="map-placeholder"><div>◒</div><small>SEA / AU</small></div><ol><li><span>Australia</span><b>48%</b></li><li><span>Malaysia</span><b>33%</b></li><li><span>Indonesia</span><b>25%</b></li><li><span>Singapore</span><b>17%</b></li></ol></div><button onClick={() => onAction('Country details opened')} className="view-more">View more <ChevronRight size={14} /></button></div>
}

function RetentionWidget({ onAction }) {
  return <div className="pivora-panel retention-widget"><div className="widget-title"><div><h2>Retention Rate</h2><p>95% <span className="positive">+12%</span> <small>vs last month</small></p></div><button className="widget-menu" aria-label="Retention widget options" onClick={() => onAction('Retention widget options opened')}><MoreHorizontal size={18} /></button></div><div className="retention-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={retentionSeries}><CartesianGrid stroke="#f0eef8" vertical={false} /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#9b98aa', fontSize: 11 }} /><YAxis hide /><Tooltip /><Bar dataKey="SMEs" stackId="a" fill="#c5bdf7" /><Bar dataKey="Startups" stackId="a" fill="#8d81e8" /><Bar dataKey="Enterprises" stackId="a" fill="#6254ce" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div><div className="retention-legend"><span><i className="legend-sme" /> SMEs</span><span><i className="legend-startup" /> Startups</span><span><i className="legend-enterprise" /> Enterprises</span></div></div>
}

function LeadsPage({ onOpen, onAdd }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const filteredLeads = leadRows.filter((lead) => {
    const matchesQuery = `${lead.name} ${lead.email} ${lead.company}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (status === 'All' || lead.status === status)
  })
  return (
    <div className="leads-page">
      <div className="leads-toolbar">
        <div><p className="eyebrow">Growth pipeline</p><h2>Leads</h2><p className="insight-copy">Capture, qualify, and convert your next best opportunities.</p></div>
        <button className="primary-button" onClick={onAdd}>+ Add lead</button>
      </div>
      <div className="leads-summary"><div><span>Total leads</span><strong>{leadRows.length}</strong></div><div><span>Qualified</span><strong>{leadRows.filter((lead) => lead.status === 'Qualified').length}</strong></div><div><span>Avg. AI score</span><strong>{Math.round(leadRows.reduce((sum, lead) => sum + lead.score, 0) / leadRows.length)}</strong></div></div>
      <div className="panel leads-table-panel"><div className="leads-filters"><label><Search size={15} /><input aria-label="Search leads" placeholder="Search leads" value={query} onChange={(event) => setQuery(event.target.value)} /></label><select aria-label="Filter leads by status" value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>New</option><option>Contacted</option><option>Qualified</option></select></div><div className="table-wrap"><table><thead><tr>{['Lead','Company','Source','AI Score','Status','Owner'].map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{filteredLeads.map((lead) => <tr className="clickable-row" key={lead.email} tabIndex="0" onClick={() => onOpen(lead.name, `${lead.email} · ${lead.company} · ${lead.source} · AI score ${lead.score} · ${lead.status}`)} onKeyDown={(event) => event.key === 'Enter' && onOpen(lead.name, `${lead.email} · ${lead.company} · ${lead.source} · AI score ${lead.score} · ${lead.status}`)}><td><strong>{lead.name}</strong><small className="table-secondary">{lead.email}</small></td><td>{lead.company}</td><td>{lead.source}</td><td><span className="lead-score">{lead.score}</span></td><td><span className={`status-pill ${lead.status.toLowerCase()}`}>{lead.status}</span></td><td>{lead.owner}</td></tr>)}</tbody></table>{filteredLeads.length === 0 && <div className="empty-state">No leads match your filters.</div>}</div></div>
    </div>
  )
}

function CompaniesPage({ onOpen }) {
  return (
    <PanelTable onOpen={onOpen}
      title="Companies"
      subtitle="Account portfolio"
      rows={companyRows}
      columns={['Company', 'Segment', 'Health', 'Value', 'Owner']}
      renderRow={(row) => (
        <>
          <td>{row.company}</td>
          <td>{row.segment}</td>
          <td><span className={`status-pill ${row.health.toLowerCase().replace(/\s+/g, '-')}`}>{row.health}</span></td>
          <td>{row.value}</td>
          <td>{row.owner}</td>
        </>
      )}
    />
  )
}

function ContactsPage({ onOpen }) {
  return (
    <PanelTable onOpen={onOpen}
      title="Contacts"
      subtitle="Relationship map"
      rows={contactRows}
      columns={['Name', 'Role', 'Company', 'Status']}
      renderRow={(row) => (
        <>
          <td>{row.name}</td>
          <td>{row.role}</td>
          <td>{row.company}</td>
          <td><span className={`status-pill ${row.status.toLowerCase().replace(/\s+/g, '-')}`}>{row.status}</span></td>
        </>
      )}
    />
  )
}

function DealsPage({ onOpen }) {
  return (
    <PanelTable onOpen={onOpen}
      title="Deals"
      subtitle="Pipeline, value and momentum"
      rows={dealRows}
      columns={['Account', 'Stage', 'Value', 'Owner', 'Status']}
      renderRow={(row) => (
        <>
          <td>{row.name}</td>
          <td>{row.stage}</td>
          <td>{row.value}</td>
          <td>{row.owner}</td>
          <td><span className={`status-pill ${row.status.toLowerCase().replace(/\s+/g, '-')}`}>{row.status}</span></td>
        </>
      )}
    />
  )
}

function TasksPage({ onOpen }) {
  return (
    <PanelTable onOpen={onOpen}
      title="Tasks"
      subtitle="Execution queue"
      rows={taskRows}
      columns={['Task', 'Assignee', 'Due', 'Priority']}
      renderRow={(row) => (
        <>
          <td>{row.task}</td>
          <td>{row.assignee}</td>
          <td>{row.due}</td>
          <td><span className={`status-pill ${row.priority.toLowerCase()}`}>{row.priority}</span></td>
        </>
      )}
    />
  )
}

function ReportsPage({ onOpen }) {
  return (
    <div className="reports-grid">
      <div className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Executive</p>
            <h3>Latest reports</h3>
          </div>
        </div>
        <div className="report-list">
          {reportRows.map((report) => (
          <button key={report.name} className="report-item" onClick={() => onOpen(report.name, `${report.owner} · Updated ${report.updated}`)}>
              <div>
                <div className="report-name">{report.name}</div>
                <div className="stack-meta">{report.owner}</div>
              </div>
              <span className="stack-meta">{report.updated}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Forecast</p>
            <h3>Quarterly trend</h3>
          </div>
        </div>
        <div className="chart-wrap chart-wrap-small">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueSeries}>
              <CartesianGrid stroke="rgba(164,179,204,0.12)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#8aa0bf', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#8aa0bf', fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#72d6a5" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function AutomationPage({ onAction }) {
  return (
    <PanelTable
      title="Workflow automation"
      subtitle="Rules that keep revenue moving"
      rows={automationRows}
      columns={['Workflow', 'Trigger', 'Action', 'Runs', 'Status']}
      renderRow={(row) => (
        <>
          <td>{row.name}</td><td>{row.trigger}</td><td>{row.action}</td><td>{row.runs}</td>
          <td><button className={`status-pill ${row.status.toLowerCase()}`} onClick={() => onAction(`${row.name} is ${row.status.toLowerCase()}`)}>{row.status}</button></td>
        </>
      )}
    />
  )
}

function AiInsightsPage({ onAction }) {
  return (
    <div className="ai-dashboard">
      <section>
        <div className="section-heading"><div><p className="eyebrow">Lead intelligence</p><h2>High-intent leads</h2></div><span className="section-count">3 insights</span></div>
        <div className="insight-list">
          {leadInsights.map((lead) => <InsightCard key={lead.email} name={lead.name} meta={`${lead.email} · ${lead.company}`} note={lead.note} score={lead.score} label="AI Score" badge="INTENT: HIGH" onAction={onAction} actionLabel="Create follow-up" />)}
        </div>
      </section>
      <section>
        <div className="section-heading"><div><p className="eyebrow">Deal intelligence</p><h2>Deal risk monitor</h2></div><span className="section-count">4 deals</span></div>
        <div className="insight-list">
          {dealRisks.map((deal) => <InsightCard key={deal.name} name={deal.name} meta={`${deal.value} · ${deal.stage}`} score={deal.score} label="Win %" badge={`RISK: ${deal.risk}`} risk={deal.risk} onAction={onAction} actionLabel="Open deal" />)}
        </div>
      </section>
    </div>
  )
}

function InsightCard({ name, meta, note, score, label, badge, risk, onAction, actionLabel }) {
  const ringColor = risk === 'HIGH' ? '#f08a8a' : score > 80 ? '#45c59d' : '#f0ba6b'
  return (
    <article className="ai-card">
      <div className="ai-card-copy">
        <div className="ai-card-title"><strong>{name}</strong><span className={`ai-badge ${risk === 'HIGH' ? 'risk-high' : 'risk-low'}`}>{badge}</span></div>
        <div className="ai-card-meta">{meta}</div>
        {note && <p className="ai-card-note">“{note}”</p>}
        {onAction && <button className="card-action" onClick={() => onAction(`${actionLabel}: ${name}`)}>{actionLabel}</button>}
      </div>
      <div className="score-wrap"><div className="score-ring" style={{ '--score': `${score * 3.6}deg`, '--ring-color': ringColor }}><div className="score-value">{score}</div></div><span>{label}</span></div>
    </article>
  )
}

function AnalyticsPage() {
  return (
    <div className="content-grid two-column">
      <div className="panel chart-panel large-panel"><div className="panel-header"><div><p className="eyebrow">Analytics</p><h3>Revenue performance</h3></div><span className="chip chip-green">On target</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><LineChart data={revenueSeries}><CartesianGrid stroke="rgba(164,179,204,0.12)" vertical={false} /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#8aa0bf', fontSize: 12 }} /><YAxis tickLine={false} axisLine={false} tick={{ fill: '#8aa0bf', fontSize: 12 }} /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#7ad9ff" strokeWidth={3} /><Line type="monotone" dataKey="target" stroke="#ae9cff" strokeWidth={2} /></LineChart></ResponsiveContainer></div></div>
      <div className="panel chart-panel"><div className="panel-header"><div><p className="eyebrow">Attribution</p><h3>Lead sources</h3></div></div><div className="chart-wrap chart-wrap-small"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={channelPerformance} dataKey="value" nameKey="name" innerRadius={46} outerRadius={72} paddingAngle={2}>{channelPerformance.map((entry, index) => <Cell key={entry.name} fill={PIE_COLORS[index]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div><div className="legend-list">{channelPerformance.map((item, index) => <div className="legend-item" key={item.name}><span className="legend-swatch" style={{ background: PIE_COLORS[index] }} /><span>{item.name}</span><strong>{item.value}%</strong></div>)}</div></div>
    </div>
  )
}

function CalendarPage({ onOpen }) {
  return <PanelTable onOpen={onOpen} title="Calendar" subtitle="Today · September 22" rows={calendarRows} columns={['Time', 'Event', 'Type', 'Owner']} renderRow={(row) => <><td>{row.time}</td><td>{row.title}</td><td>{row.type}</td><td>{row.owner}</td></>} />
}

function InboxPage({ onOpen }) {
  return <div className="panel inbox-panel"><div className="panel-header"><div><p className="eyebrow">Inbox</p><h3>Customer conversations</h3></div><span className="chip chip-blue">2 unread</span></div><div className="inbox-list">{inboxRows.map((row) => <button className={`inbox-item ${row.unread ? 'unread' : ''}`} key={row.subject} onClick={() => onOpen(row.subject, `${row.sender}: ${row.preview}`)}><div className="avatar">{row.sender.split(' ').map((part) => part[0]).join('')}</div><div className="inbox-copy"><strong>{row.sender}</strong><span>{row.subject}</span><p>{row.preview}</p></div><time>{row.age}</time></button>)}</div></div>
}

function WorkspacePage({ onAction }) {
  return <div className="workspace-grid"><div className="panel workspace-card"><p className="eyebrow">Workspace</p><h3>Revenue operations</h3><p className="insight-copy">12 members · 4 shared dashboards · synced 2 minutes ago</p><button className="primary-button" onClick={() => onAction('Invite link copied')}>Invite teammate</button></div><div className="panel workspace-card"><p className="eyebrow">Connected tools</p><h3>8 integrations active</h3><div className="integration-list"><button onClick={() => onAction('Calendar integration opened')}>Calendar</button><button onClick={() => onAction('Email integration opened')}>Email</button><button onClick={() => onAction('Slack integration opened')}>Slack</button><button onClick={() => onAction('Data warehouse integration opened')}>Data warehouse</button></div></div></div>
}

function SettingsPage({ onAction }) {
  return <div className="settings-list"><div className="panel settings-row"><div><p className="eyebrow">Profile</p><h3>Account preferences</h3><p className="insight-copy">Manage your profile, timezone, and notification defaults.</p></div><button className="ghost-button" onClick={() => onAction('Profile editor opened')}>Edit</button></div><div className="panel settings-row"><div><p className="eyebrow">Security</p><h3>Authentication</h3><p className="insight-copy">Single sign-on and session controls are managed by your workspace admin.</p></div><button className="ghost-button" onClick={() => onAction('Security settings opened')}>Manage</button></div></div>
}

function PanelTable({ title, subtitle, rows, columns, renderRow, onOpen }) {
  return (
    <div className="panel table-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{subtitle}</p>
          <h3>{title}</h3>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr className={onOpen ? 'clickable-row' : ''} tabIndex={onOpen ? 0 : undefined} onClick={onOpen ? () => onOpen(row.name || row.title || row.task || row.event || `Record ${index + 1}`, Object.values(row).join(' · ')) : undefined} onKeyDown={onOpen ? (event) => event.key === 'Enter' && onOpen(row.name || row.title || row.task || row.event || `Record ${index + 1}`, Object.values(row).join(' · ')) : undefined} key={index}>{renderRow(row)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
