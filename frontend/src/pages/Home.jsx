import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/preliminary-ranking')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching preliminary ranking:', error));
  }, []);

  return (
    <div>
      {/* Top Section with Background Image */}
      <section className="top-section">
        {/* Empty section with background image */}
      </section>

      {/* Main Content */}
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
              <h3>Az oldal használatáról</h3>
              <p>
                Ön az oldal használatával a következő információkhoz juthat hozzá:<br />
                <strong>Előzetes rangsor:</strong> Nevek, Ágazat, Összes pontszám<br />
                <strong>Előzetes rangsor nyelvi előkészítő</strong><br />
                <strong>A felvettek névsora</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="bg-light">
              <h3>A felvett tanulók névsora</h3>
              <p>A felvett tanulók száma: 32 fő.</p>
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
                      <td>{item.osszpont}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;