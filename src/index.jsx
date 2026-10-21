import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';
function App() {
  const [count, setCount] = createSignal(0);
  return (
    <div style={{ padding: '20px', "text-align": 'center', "font-family": 'sans-serif', background: '#0b141a', color: 'white', height: '100vh' }}>
      <h1>BahBorak App</h1><p>Solid Native Ready!</p>
      <button style={{ padding: '10px 20px', "border-radius": '8px', background: '#00a884', color: 'white', border: 'none' }} onClick={() => setCount(count() + 1)}>Klik: {count()}</button>
    </div>
  );
}
render(() => <App />, document.getElementById('root'));
