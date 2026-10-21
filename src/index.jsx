import { render } from 'solid-js/web';
import { createSignal, Show, For } from 'solid-js';

const API_URL = "https://bahborak-api.vmojuga.workers.dev";

const C = {
  bg: '#0a1017',
  header: '#111a21',
  search: '#202c39',
  text: '#f1f5f5',
  subtext: '#8696a0',
  primary: '#00c9a7',
  secondary: '#0056d2',
  border: 'rgba(255,255,255,0.05)',
  bubbleMe: 'linear-gradient(135deg, #0056d2, #00c9a7)',
  bubbleThem: 'rgba(255,255,255,0.06)'
};

const platforms = [
  { name: "BorneoAI", category: "AI & Automation", icon: "🤔", color: C.primary, followers: "12K" },
  { name: "SabahPay", category: "Finance", icon: "💰", color: C.secondary, followers: "45K" },
  { name: "Kinabalu Mart", category: "E-Commerce", icon: "🛠️", color: "#f59e0b", followers: "89K" },
  { name: "TAR Booking", category: "Travel", icon: "✈️", color: "#8b5cf6", followers: "23K" },
  { name: "Nourish Delivery", category: "Food", icon: "🍱", color: "#ef4444", followers: "56K" },
  { name: "Bizness Lawyer", category: "Legal", icon: "⚖️", color: "#6366f1", followers: "5K" }
];

function App() {
  const [view, setView] = createSignal('login');
  const [phone, setPhone] = createSignal('');
  const [otp, setOtp] = createSignal('');
  const [debugOtp, setDebugOtp] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [activeChat, setActiveChat] = createSignal(null);
  const [msgInput, setMsgInput] = createSignal('');
  const [messages, setMessages] = createSignal([
    { id: 1, text: "Hai, selamat datang bach!", sender: 'them', time: '10:45' },
    { id: 2, text: "Bagaimana saya boleh membantu anda hari ini?", sender: 'them', time: '10:45' },
    { id: 3, text: "Saya nak tanya pasal status pesanan.", sender: 'me', time: '10:46' }
  ]);

  const handleSendOtp = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/customer/send-otp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone: phone() }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.debug_otp) setDebugOtp(data.debug_otp);
      setView('otp');
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/customer/verify-otp`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone: phone(), otp: otp() }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem('customer_token', data.token);
      setView('chat');
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  const sendMessage = () => {
    const text = msgInput().trim();
    if (!text) return;
    setMessages([...messages(), { id: Date.now(), text, sender: 'me', time: new Date().toLocaleTimeString().slice(0, 5) }]);
    setMsgInput('');
  };

  return (
    <div style={{ height: '100vh', 'background-color': C.bg, color: C.text, 'font-family': 'Inter, system-ui, sans-serif', 'display': 'flex', 'flex-direction': 'column', position: 'relative' }}>
      
      {/* SCREEN 1: LOGIN */}
      <Show when={view() === 'login'}>
        <div style={{ display: 'flex', 'flex-direction': 'column', height: '100%', 'justify-content': 'center', padding: '30px', background: 'radial-gradient(circle at 50% 0%, rgba(0,201,167,0.15) 0%, transparent 50%)' }}>
          <div style={{ 'text-align': 'center', 'margin-bottom': '40px' }}>
            <h1 style={{ background: 'linear-gradient(to right, #0056d2, #00c9a7)', '-webkit-background-clip': 'text', color: 'transparent', 'font-size': '40px', 'font-weight': '800', 'letter-spacing': '-1px' }}>BahBorak</h1>
            <p style={{ color: C.subtext, 'margin-top': '10px', 'font-size': '14px' }}>Enter your phone number to connect.</p>
          </div>
          <form onSubmit={handleSendOtp} style={{ display: 'flex', 'flex-direction': 'column', gap: '16px' }}>
            <input type="tel" placeholder="0123456789" value={phone()} onInput={(e) => setPhone(e.currentTarget.value)} style={{ 'background-color': C.search, border: '1px solid rgba(255,255,255,0.1)', padding: '18px', 'border-radius': '16px', color: 'white', 'font-size': '18px', 'text-align': 'center', 'letter-spacing': '2px', outline: 'none', boxShadow: '0 0 15px rgba(0,201,167,0.1)' }} />
            <button type="submit" disabled={loading()} style={{ background: 'linear-gradient(to right, #0056d2, #00c9a7)', color: 'white', border: 'none', padding: '18px', 'border-radius': '16px', 'font-size': '16px', 'font-weight': '700', boxShadow: '0 4px 20px rgba(0,201,167,0.3)' }}>
              {loading() ? 'Connecting...' : 'Continue'}
            </button>
          </form>
        </div>
      </Show>

      {/* SCREEN 2: OTP */}
      <Show when={view() === 'otp'}>
        <div style={{ display: 'flex', 'flex-direction': 'column', height: '100%', 'justify-content': 'center', padding: '30px' }}>
          <div style={{ 'text-align': 'center', 'margin-bottom': '40px' }}>
            <h1 style={{ 'font-size': '24px', 'font-weight': '700' }}>Verify OTP</h1>
            <p style={{ color: C.subtext, 'margin-top': '10px' }}>Code sent to {phone()}</p>
            <p style={{ color: C.primary, 'font-size': '12px', 'margin-top': '10px', 'font-weight': 'bold' }}>Debug: {debugOtp()}</p>
          </div>
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', 'flex-direction': 'column', gap: '16px' }}>
            <input type="text" placeholder="123456" maxLength="6" value={otp()} onInput={(e) => setOtp(e.currentTarget.value)} style={{ 'background-color': C.search, border: '1px solid rgba(255,255,255,0.1)', padding: '18px', 'border-radius': '16px', color: 'white', 'font-size': '24px', 'text-align': 'center', 'letter-spacing': '8px', outline: 'none' }} />
            <button type="submit" disabled={loading()} style={{ background: 'linear-gradient(to right, #0056d2, #00c9a7)', color: 'white', border: 'none', padding: '18px', 'border-radius': '16px', 'font-size': '16px', 'font-weight': '700' }}>
              {loading() ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        </div>
      </Show>

      {/* SCREEN 3: CHAT LIST & SCREEN 5: CHAT DETAIL */}
      <Show when={view() === 'chat'}>
        <div style={{ display: 'flex', 'flex-direction': 'column', height: '100%' }}>
          <header style={{ 'background-color': C.header, padding: '20px 16px', display: 'flex', 'justify-content': 'space-between', 'align-items': 'center', color': C.primary, 'font-size': '24px', 'font-weight': '700' }}>
            <span>Chats</span>
          </header>
          <main style={{ flex: 1, 'overflow-y': 'auto' }}>
            <div onClick={() => { setActiveChat({name: 'BahBorak Official', icon: '💐'}); setView('chat-detail'); }} style={{ display: 'flex', 'align-items': 'center', padding: '16px', gap: '16px', 'border-bottom': `1px solid ${C.border}`, cursor: 'pointer' }}>
              <div style={{ width: '56px', height: '56px', 'border-radius': '50%', background: 'linear-gradient(to right, #0056d2, #00c9a7)', display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'font-size': '24px', color: 'white' }}>🐿</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', 'text', 'justify-content': 'space-between', 'margin-bottom': '4px' }}>
                  <span style={{ 'font-size': '17px', 'font-weight': '600' }}>BahBorak Official</span>
                  <span style={{ 'font-size': '13px', color: C.primary }}>New</span>
                </div>
                <div style={{ 'font-size': '15px', color: C.subtext }}>Welcome to BahBorak!</div>
              </div>
            </div>
          </main>
        </div>
      </Show>

      {/* SCREEN 5: CHAT DETAIL */}
      <Show when={view() === 'chat-detail'}>
        <div style={{ display: 'flex', 'flex-direction': 'column', height: '100%', background: '#05080b' }}>
          <header style={{ 'background-color': C.header, padding: '16px', display: 'flex', 'align-items': 'center', gap: '12px', 'border-bottom': `1px solid ${C.border}` }}>
            <div onClick={() => setView('chat')} style={{ color: C.primary, cursor: 'pointer', 'font-size': '20px' }}>←</div>
            <div style={{ width: '40px', height: '40px', 'border-radius': '50%', background: C.primary, display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'font-size': '20px', color: 'white' }}>🐿</div>
            <div>
              <div style={{ 'font-size': '16px', 'font-weight': '600' }}>BahBorak Official</div>
              <div style={{ 'font-size': '12px', color: C.primary }}>Online</div>
            </div>
          </header>

          <div style={{ flex: 1, 'overflow-y': 'auto', padding: '20px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
            <For each={messages()}>
              {(msg) => (
                <div style={{ 'align-self': msg.sender === 'me' ? 'flex-end' : 'flex-start', 'max-width': '80%', background: msg.sender === 'me' ? C.bubbleMe : C.bubbleThem, color: msg.sender === 'me' ? 'white' : C.text, padding: '12px 16px', 'border-radius': msg.sender === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', 'box-shadow': '0 2px 5px rgba(0,0,0,0.2)', 'border': msg.sender === 'them' ? `1px solid ${C.border}` : 'none', position: 'relative' }}>
                  <div>{msg.text}</div>
                  <div style={{ 'font-size': '10px', color: msg.sender === 'me' ? 'rgba(255,255,255,0.7)' : C.subtext, 'text-align': 'right', 'margin-top': '4px' }}>{msg.time}</div>
                </div>
              )
            </For>
          </div>

          <div style={{ 'background-color': C.header, padding: '12px', display: 'flex', gap: '8px', 'align-items': 'center', 'border-top': `1px solid ${C.border}` }}>
            <input type="text" placeholder="Taip mesej..." value={msgInput()} onInput={(e) => setMsgInput(e.currentTarget.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} style={{ flex: 1, 'background-color': C.search, border: 'none', padding: '14px', 'border-radius': '24px', color: 'white', outline: 'none' }} />
            <button onClick={sendMessage} style={{ background: C.primary, border: 'none', width: '48px', height: '48px', 'border-radius': '50%', display: 'flex', 'align-items': 'center', 'justify-content': 'center', color: 'white', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,201,167,0.4)' }}>
              ➤
            </button>
          </div>
        </div>
      </Show>

      {/* SCREEN 4: TOOLS / ECOSYSTEM HUB */}
      <Show when={view() === 'tools'}>
        <div style={{ display: 'flex', 'flex-direction': 'column', height: '100%', background: 'radial-gradient(circle at 50% -20%, rgba(0,56,210,0.15) 0%, #0a1017 60%)' }}>
          <header style={{ padding: '20px 20px 10px 20px', display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' }}>
            <div>
              <h1 style={{ 'font-size': '28px', 'font-weight': '800', 'letter-spacing': '-0.5px' }}>Ecosystem</h1>
              <p style={{ color: C.subtext, 'font-size': '14px', 'margin-top': '4px' }}>Discover 26 premium platforms.</p>
            </div>
          </header>

          <div style={{ padding: '0 20px', display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '16px', 'overflow-y': 'auto', 'padding-bottom': '100px' }}>
            <For each={platforms}>
              {selectedPlatform => (
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', 'border-radius': '20px', padding: '16px', display: 'flex', 'flex-direction': 'column', gap: '12px', position: 'relative', 'overflow': 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: `selectedPlatform.color`, filter: 'blur(50px)', opacity: 0.2, zIndex: 0 }}></div>
                
                <div style={{ zIndex: 1, width: '48px', height: '48px', 'border-radius': '14px', background: 'rgba(255,255,255,0.1)', display: 'flex', 'align-items': 'center', 'justify-content': 'center', 'font-size': '24px' }}>{selectedPlatform.icon}</div>
                
                <div style={{ zIndex: 1 }}>
                  <div style={{ 'font-size': '16px', 'font-weight': '700', color: 'white' }}>{selectedPlatform.name}</div>
                  <div style={{ 'font-size': '12px', color: C.subtext, 'margin-top': '2px' }}>{selectedPlatform.category}</div>
                </div>

                <div style={{ zIndex: 1, 'display': 'flex', 'align-items': 'center', 'justify-content': 'space-between', 'margin-top': 'auto' }}>
                  <span style={{ 'font-size': '11px', color: C.subtext }}>{selectedPlatform.followers} followers</span>
                  <button style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '6px 12px', 'border-radius': '8px', 'font-size': '12px', 'font-weight': '600' }}>Explore</button>
                </div>
              </div>
            )</For>
          </div>
        </div>
      </Show>

      {/* BOTTOM NAV */}
      <Show when={view() !== 'login' && view() !== 'otp' && view() !== 'chat-detail' && view() !== 'chat-detail'}>
        <nav style={{ 'background-color': C.header, 'border-top': `1px solid ${C.border}`, display: 'flex', 'justify-content': 'space-around', padding: '10px 0 20px 0', 'font-size': '12px', 'font-weight': '600', position: 'absolute', bottom: 0, width: '100%', 'backdrop-filter': 'blur(10px)' }}>
          <div onClick={() => setView('chat')} style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', color: {view() === 'chat' ? C.text : C.subtext}, gap: '4px', cursor: 'pointer' }}>
            <span style={{ 'font-size': '20px' }}>💫</span>
            <span>Chats</span>
          </div>
          <div onClick={() => setView('tools')} style={{ display: 'flex', 'flex-direction': 'column', 'align-items': 'center', color: {view() === 'tools' ? C.primary : C.subtext}, gap: '4px', cursor: 'pointer' }}>
            <span style={{ 'font-size': '20px' }}>🌈<span>
            <span>Ecosystem</span>
          </div>
        </nav>
      </Show>
    </div>
  );
}

render(() => <App />, document.getElementById('root'));
