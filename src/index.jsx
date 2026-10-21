import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';

// Warna tema WhatsApp Dark Mode
const C = {
  bg: '#0b141a',
  header: '#111b21',
  search: '#202c39',
  text: '#e9edef',
  subtext: '#8696a0',
  primary: '#00a884',
  border: '#222f3f'
};

function App() {
  const chats = [
    { name: "BahBorak Official", msg: "Terima kasih kerana guna perkhidmatan kami.", time: "10:45", unread: 2, avatar: "/logo.jpg" },
    { name: "Kumpulan Peniaga Sabah", msg: "Ali: Esok meeting jam 10 pagi.", time: "9:30", unread: 0, group: true },
    { name: "Kedai Ali", msg: "Pesanan anda telah dihantar.", time: "Semalam", unread: 0 },
    { name: "Servis Kereta Abang", msg: "Kereta siap baiki.", time: "Semalam", unread: 0 }
  ];

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', height: '100vh', 'background-color': C.bg, color: C.text, 'font-family': 'system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <header style={{ 'background-color': C.header, padding: '16px', display: 'flex', 'justify-content': 'space-between', 'align-items': 'center', color: C.primary, 'font-size': '22px', 'font-weight': '600' }}>
        <span>BahBorak</span>
        <div style={{ display: 'flex', gap: '20px', color: C.text }}>
          {/* Icons (Camera & Menu) - Simple SVG */}
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </div>
      </header>

      {/* SEARCH BAR */}
      <div style={{ padding: '8px 12px', 'background-color': C.bg }}>
        <div style={{ 'background-color': C.search, padding: '8px 16px', 'border-radius': '8px', display: 'flex', 'align-items': 'center', gap: '12px' }}>
          <svg width="20" height="20" stroke={C.subtext} fill="none" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search..." style={{ background: 'transparent', border: 'none', color: C.text, width: '100%', outline: 'none', 'font-size': '15px' }} />
        </div>
      </div>

      {/* ARCHIVED ROW */}
      <div style={{ display: 'flex', 'align-items': 'center', padding: '12px 16px', 'border-bottom': `1px solid ${C.border}` }}>
        <svg width="24" height="24" stroke={C.primary} fill="none" stroke-width="2" style={{ 'margin-right': '12px' }}><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
        <span style={{ 'flex': 1, 'font-size': '16px' }}>Archived</span>
        <span style={{ color: C.subtext, 'font-size': '13px' }}>12</span>
      </div>

      {/* CHAT LIST */}
      <main style={{ flex: 1, 'overflow-y': 'auto' }}>
        {chats.map(chat => (
          <div style={{ display: 'flex', 'align-items': 'center', padding: '12px 16px', gap: '16px', cursor: 'pointer' }}>
            {/* Avatar */}
            <div style={{ width: '48px', height: '48px', 'border-radius': '50%', 'background-color': chat.group ? '#6b7280' : C.primary, display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'font-size': '24px', 'overflow': 'hidden' }}>
              {chat.avatar ? <img src={chat.avatar} style={{ width: '100%', height: '100%', 'object-fit': 'cover' }} /> : "👥"}
            </div>
            
            {/* Message Details */}
            <div style={{ flex: 1, 'border-bottom': `1px solid ${C.border}`, 'padding-bottom': '12px', 'margin-top': '12px' }}>
              <div style={{ display: 'flex', 'justify-content': 'space-between', 'margin-bottom': '4px' }}>
                <span style={{ 'font-size': '16px', 'font-weight': '500' }}>{chat.name}</span>
                <span style={{ 'font-size': '12px', color: chat.unread ? C.primary : C.subtext }}>{chat.time}</span>
              </div>
              <div style={{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }}>
                <span style={{ 'font-size': '14px', color: C.subtext, 'white-space': 'nowrap', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'max-width': '200px' }}>{chat.msg}</span>
                {chat.unread > 0 && (
                  <div style={{ 'background-color': C.primary, color: C.bg, 'font-size': '12px', 'font-weight': 'bold', 'min-width': '20px', 'height': '20px', 'border-radius': '10px', display: 'flex', 'align-items': 'center', 'justify-content': 'center', padding: '0 6px' }}>
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* FLOATING ACTION BUTTON (FAB) */}
      <div style={{ position: 'absolute', bottom: '80px', right: '20px', 'background-color': C.primary, width: '56px', height: '56px', 'border-radius': '16px', display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'box-shadow': '0 4px 10px rgba(0,0,0,0.3)' }}>
        <svg width="28" height="28" stroke={C.bg} fill="none" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </div>

      {/* BOTTOM NAVIGATION */}
      <nav style={{ 'background-color': C.header, 'border-top': `1px solid ${C.border}`, display: 'flex', 'justify-content': 'space-around', padding: '10px 0 20px 0', 'font-size': '12px', 'font-weight': '500' }}>
        
        <div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', color: C.text, gap: '4px' }}>
          <div style={{ position: 'relative' }}>
            <svg width="24" height="24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            <div style={{ position: 'absolute', top: '-4px', right: '-8px', background: C.primary, color: C.bg, 'border-radius': '50%', width: '16px', height: '16px', 'font-size': '10px', display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'font-weight': 'bold' }}>33</div>
          </div>
          <span>Chats</span>
        </div>

        <div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', color: C.subtext, gap: '4px' }}>
          <svg width="24" height="24" stroke="currentColor" fill="none" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Calls</span>
        </div>

        <div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', color: C.subtext, gap: '4px' }}>
          <div style={{ position: 'relative' }}>
            <svg width="24" height="24" stroke="currentColor" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            <div style={{ position: 'absolute', top: 0, right: '-2px', background: C.primary, width: '8px', height: '8px', 'border-radius': '50%' }}></div>
          </div>
          <span>Updates</span>
        </div>

        <div style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', color: C.subtext, gap: '4px' }}>
          <svg width="24" height="24" stroke="currentColor" fill="none" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          <span>Tools</span>
        </div>
      </nav>
    </div>
  );
}

render(() => <App />, document.getElementById('root'));
