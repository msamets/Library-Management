import React from 'react';
import { Container } from '@mui/material';
import BookList from '../components/BookList';

const mockBooks = [
  {"id":1,"name":"Larkin Group"},
  {"id":2,"name":"Kilback-Yundt"},
  {"id":3,"name":"O'Hara, Pagac and Moore"},
  {"id":4,"name":"O'Hara LLC"},
  {"id":5,"name":"Heller-Dietrich"},
  {"id":6,"name":"Zieme, Pfannerstill and Wiegand"},
  {"id":7,"name":"Waters-Ledner"},
  {"id":8,"name":"Walsh LLC"},
  {"id":9,"name":"Wyman-Klein"},
  {"id":10,"name":"Hodkiewicz-Cummings"},
  {"id":11,"name":"Runte-Ledner"},
  {"id":12,"name":"Ryan Group"},
  {"id":13,"name":"Hackett-Hills"},
  {"id":14,"name":"Graham LLC"},
  {"id":15,"name":"Lowe-Jones"},
  {"id":16,"name":"Cormier-Hoeger"},
  {"id":17,"name":"Adams LLC"},
  {"id":18,"name":"Padberg Inc"},
  {"id":19,"name":"Ryan-Emard"},
  {"id":20,"name":"O'Connell-Gorczany"},
  {"id":21,"name":"VonRueden, Gleason and Wintheiser"},
  {"id":22,"name":"Daugherty-Streich"},
  {"id":23,"name":"Cronin-Torphy"},
  {"id":24,"name":"Bogan LLC"},
  {"id":25,"name":"Goodwin-Shanahan"},
  {"id":26,"name":"Herman-Zboncak"},
  {"id":27,"name":"Bode-Reichert"},
  {"id":28,"name":"Bradtke-Raynor"},
  {"id":29,"name":"Hirthe-Braun"},
  {"id":30,"name":"Heller Inc"},
  {"id":31,"name":"Murazik-Metz"},
  {"id":32,"name":"Goodwin Group"},
  {"id":33,"name":"Bogan Inc"},
  {"id":34,"name":"Watsica-Kris"},
  {"id":35,"name":"Waters Inc"},
  {"id":36,"name":"Paucek-Rempel"},
  {"id":37,"name":"Gleichner, Maggio and Langosh"},
  {"id":38,"name":"Weimann, Corkery and Aufderhar"},
  {"id":39,"name":"Hudson-Reichel"},
  {"id":40,"name":"Nitzsche, Pfannerstill and Schiller"},
  {"id":41,"name":"Carter-Bechtelar"},
  {"id":42,"name":"Crona-Nienow"},
  {"id":43,"name":"Kozey-Friesen"},
  {"id":44,"name":"Shanahan-Gutkowski"},
  {"id":45,"name":"Roberts-Reichel"},
  {"id":46,"name":"Hoeger-Witting"},
  {"id":47,"name":"Lowe, Cormier and Marquardt"},
  {"id":48,"name":"Kertzmann-Boehm"},
  {"id":49,"name":"Kilback, Wunsch and Haag"},
  {"id":50,"name":"Jacobs and Sons"},
  {"id":51,"name":"Stark LLC"},
  {"id":52,"name":"Grimes LLC"},
  {"id":53,"name":"Haley, Schaefer and Weimann"},
  {"id":54,"name":"Gutkowski, Zemlak and Thompson"},
  {"id":55,"name":"Kihn-Marquardt"},
  {"id":56,"name":"Koss, Bayer and King"},
  {"id":57,"name":"DuBuque-Auer"},
  {"id":58,"name":"Robel and Sons"},
  {"id":59,"name":"Nienow, Harvey and Swaniawski"},
  {"id":60,"name":"Oberbrunner-Osinski"},
  {"id":61,"name":"Spinka-Maggio"},
  {"id":62,"name":"Ortiz, Zboncak and Brown"},
  {"id":63,"name":"Stark Inc"},
  {"id":64,"name":"Becker-Maggio"},
  {"id":65,"name":"Abbott and Sons"},
  {"id":66,"name":"Stoltenberg Inc"},
  {"id":67,"name":"Ruecker, Hills and McDermott"},
  {"id":68,"name":"Rosenbaum, Runolfsson and Johnson"},
  {"id":69,"name":"O'Conner LLC"},
  {"id":70,"name":"Rice Inc"},
  {"id":71,"name":"Runte-Stanton"},
  {"id":72,"name":"Labadie, Mitchell and Reichel"},
  {"id":73,"name":"Feeney-Gerhold"},
  {"id":74,"name":"Thompson-McGlynn"},
  {"id":75,"name":"Bins-Hahn"},
  {"id":76,"name":"Satterfield Group"},
  {"id":77,"name":"Daugherty, Aufderhar and Koss"},
  {"id":78,"name":"Kling and Sons"},
  {"id":79,"name":"Rosenbaum, Berge and Reilly"},
  {"id":80,"name":"Maggio Inc"},
  {"id":81,"name":"Boyle and Sons"},
  {"id":82,"name":"Satterfield, Ledner and Gottlieb"},
  {"id":83,"name":"Ernser, Von and Effertz"},
  {"id":84,"name":"Sipes, Ferry and Dicki"},
  {"id":85,"name":"Monahan and Sons"},
  {"id":86,"name":"Huels and Sons"},
  {"id":87,"name":"Bogisich-Langworth"},
  {"id":88,"name":"Yundt-Heaney"},
  {"id":89,"name":"Hessel and Sons"},
  {"id":90,"name":"Hilll, Watsica and Schinner"},
  {"id":91,"name":"Stamm, Nader and O'Kon"},
  {"id":92,"name":"Schimmel, Cummerata and Dickinson"},
  {"id":93,"name":"Kuhlman LLC"},
  {"id":94,"name":"Lesch-Windler"},
  {"id":95,"name":"Ruecker-Stiedemann"},
  {"id":96,"name":"Kautzer-Shanahan"},
  {"id":97,"name":"Durgan Group"},
  {"id":98,"name":"Renner LLC"},
  {"id":99,"name":"Hilll, Kreiger and Hegmann"},
  {"id":100,"name":"Reynolds, Mante and Green"}
];

const Books: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <h1>Books</h1>
      <BookList books={mockBooks} />
    </Container>
  );
};

export default Books;
