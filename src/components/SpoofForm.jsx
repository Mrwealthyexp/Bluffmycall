import { useState } from 'react';
import axios from 'axios';

export default function SpoofForm() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [voiceMessage, setVoiceMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending spoof call...');

    try {
      const response = await axios.post('http://localhost:5000/api/calls/spoof', {
        from,
        to,
        voiceMessage,
      });
      setStatus(`Call placed! SID: ${response.data.call.sid}`);
    } catch (error) {
      setStatus('Call failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From Number"
        required
      />
      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To Number"
        required
      />
      <input
        value={voiceMessage}
        onChange={(e) => setVoiceMessage(e.target.value)}
        placeholder="Voice Message"
        required
      />
      <button type="submit">Spoof Call</button>
      <p>{status}</p>
    </form>
  );
}
