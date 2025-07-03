import AccessoryList from "./components/Lesson04/AccessoryList/index";
import ArticlesList from "./components/Lesson04/ArticalRenderList";
import styles from "./components/Lesson04/ArticalRenderList/ArticlesList.module.css";

const accessory = [
  {
    id: 1,
    title: "Combo Sữa Tắm Cho Em Bé Arau Baby 450mlabc",
    thumbnail: "images/1.jpg",
    addPrice: "400",
  },
  {
    id: 2,
    title: "Sữa bột Pediasure 850g",
    thumbnail: "images/2.jpg",
    addPrice: "400",
  },
  {
    id: 3,
    title: "Sữa Bột Friso Gold 1 900g",
    thumbnail: "images/3.jpg",
    addPrice: "400",
  },
  {
    id: 4,
    title: "Tã Quần Pampers Giữ Dáng Mới Gói Cực Đại M74",
    thumbnail: "images/4.jpg",
    addPrice: "400",
  },
];

const articles = [
  {
    id: 1,
    thumbnail: "images/1.jpg",
    title: "Ấn tượng đầu tiên Samsung Galaxy A32 4G: Với hơn 6 triệu đã có màn hình Super AMOLED 90Hz",
    addTime: "140 lượt xem",
  },
  {
    id: 2,
    thumbnail: "images/2.jpg",
    title: "Google Pixel 5a dự kiến sẽ được ra mắt cùng thời điểm với Android 12",
    addTime: "127 lượt xem",
  },
  {
    id: 3,
    thumbnail: "images/3.jpg",
    title: "Galaxy A52 4G lộ diện trên Google Play Console Xác nhận dùng chip Snapdragon 720",
    addTime: "55 lượt xem",
  },
  {
    id: 4,
    thumbnail: "images/4.jpg",
    title: "Galaxy A82 5G chuẩn bị ra mắt với chip flagship và màn hình trượt độc đáo, Samfans gom lúa đi là vừa",
    addTime: "55 lượt xem",
  },
];

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 0" }}>
      <div className={styles.articles_list_wrapper}>
        <h2 style={{ margin: "0 0 24px 0", fontWeight: 700 }}>Phụ kiện tương thích</h2>
        <AccessoryList data={accessory} />
        <h2 style={{ margin: "32px 0 24px 0", fontWeight: 700 }}>TIN MỚI</h2>
        <ArticlesList data={articles} />
      </div>
    </div>
  );
}

export default App;
