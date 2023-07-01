import Search from '../components/Home/Search';
import Footer from '../components/UI/Footer';
import Header from '../components/UI/Header';
import './Home.css';

function Home() {
  return (
    <div className="home-wrapper">
      <Header />
      <Search className="search-body" />
      <Footer className="footer" />
    </div>
  );
}

export default Home;
