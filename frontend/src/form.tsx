import React, { useState } from "react";

const IpPortForm: React.FC = () => {
  const [ip, setIp] = useState<string>('');
  const [port, setPort] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip, port }),
      });

      if (response.ok) {
        alert('Successfully sent');
      } else {
        alert('Error occurred');
      }
    } catch (error) {
      alert('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '50px' }}>
      <div>
        <input
          type="text"
          placeholder="Enter New IP"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          style={{ color: ip ? 'black' : 'gray', marginBottom: '10px', display: 'block', margin: 'auto' }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter new Port"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          style={{ color: port ? 'black' : 'gray', marginBottom: '10px', display: 'block', margin: 'auto' }}
        />
      </div>
      <button type="submit">Modify</button>
    </form>
  );
};

export default IpPortForm;
