import Footer from '@/components/footer';
import Header from '@/components/header';
import axios from 'axios';

export default function test({ country }) {
  return (
    <div>
      <Header country={country} />
      <div>Welcome from test</div>
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps() {
  let data = await axios
    .get('https://api.ipregistry.co/?key=m64nzffmbl6qteak')
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(data);
  return {
    props: {
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: 'Morocco',
        flag: 'https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360',
      },
    },
  };
}
