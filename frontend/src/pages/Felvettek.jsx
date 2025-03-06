import { useEffect, useState } from 'react';
import axios from 'axios';

function Felvettek() {
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/informatika')
      .then(response => {
        setSectors(response.data);
        if (response.data.length > 0) setSelectedSector(response.data[0].agazat);
      })
      .catch(error => console.error('Error fetching sectors:', error));
  }, []);

  useEffect(() => {
    if (selectedSector) {
      axios.get(`http://localhost:3001/elektronika/`)
        .then(response => setData(response.data))
        .catch(error => console.error('Error fetching admitted students:', error));
    }
  }, [selectedSector]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="bg-light">
            <h3>Központi felvételi tájékoztató</h3>
            <p>
              A felvételi rangsort a jelentkezőktől szerzett pontok alapján állapítják meg. A Jószakma
              Szakgimnázium a felvételi során az általános iskolából hozott és a központi felvételin szerzett
              pontok alapján rangsorolja a jelentkezőket.
            </p>
            <p><strong>OKTATÁSI HIVATAL</strong></p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-light">
            <h3>Tájékozatás</h3>
            <p>
              Jószakma Szakgimnázium<br />
              A központi felvételi magyar nyelv és irodalom, illetve matematika tantárgyakból írandó. Mindkét
              tárgy esetén legfeljebb 50 pont szerezhető. A hozott pontokat az általános iskolai év végi
              eredményei alapján számolják, ez a pontszám legfeljebb 50 pont lehet. A hozott pontokat
              duplázzák.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-light">
            <h3>A felvettek rangsora, nyelvi előkészítő</h3>
            <p>A maximálisan felvehető tanulók száma 32 fő.</p>
            <p>A választott ágazat: {selectedSector}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="bg-light">
            <table className="table">
              <thead>
                <tr>
                  <th>Tanuló neve</th>
                  <th>Ágazat</th>
                  <th>Összes pontszám</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item['Tanuló neve']}</td>
                    <td>{item['Ágazat']}</td>
                    <td>{item.osszpontszam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Felvettek;