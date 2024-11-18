const crsDataWO = {
    path: "/course/view/video",
    img: "https://cdnphoto.dantri.com.vn/lWbNf1jAm5A1aQriE5UO0SAuuYg=/2024/01/15/co-gai-xinh-dep2-edited-edited-1705310658178.jpeg",
    id: 1,
    ttl: "Learn Python: The Complete Python Programming Course Learn Python: The Complete Python Programming Course",
    author: "Koushil Mankali",
    ratings: 2.5,
    courseCoveredPercent: 22.4,
};

export const courseDataWithOptions = [
    crsDataWO,
    { ...crsDataWO, id: 2, img: "https://gcs.tripi.vn/public-tripi/tripi-feed/img/474014bom/anh-gai-xinh-cute-de-thuong-hot-girl-2.jpg" },
    { ...crsDataWO, id: 3, img: "https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg" },
    { ...crsDataWO, id: 4, img: "https://i.pinimg.com/736x/b0/28/09/b028096d34128a39b8f90ef834307f0e.jpg" },
    { ...crsDataWO, id: 5, img: "https://i.pinimg.com/736x/83/54/f0/8354f0af6681db4f1e8fa3095ea4c13d.jpg" },
    { ...crsDataWO, id: 6, img: "https://i.pinimg.com/736x/fd/31/1f/fd311f1c3ec51742d355fcbcab2024b6.jpg" },
];

const crsData = {
    path: "/",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png",
    id: 1,
    ttl: "Lòng Yêu Nước là gì? Nó có ăn được không?",
    authDet:
        "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more",
    prc: 600,
    oldprc: 3299,
    stars: { a: 2, b: 3, c: 5, d: 8, e: 9 },
    noOfRats: 5,
    updatedDate: new Intl.DateTimeFormat("en-IN", {
        dateStyle: "long",
    }).format(new Date()),
    courseDuration: 1000000,
    level: "Beginner Level",
    crsSubtxt:
        "Python For Beginners : This course is meant for absolute beginners in programming or in python.",
};

export const coursesData = [
    crsData,
    crsData,
    crsData,
    crsData,
    crsData,
    crsData,
    crsData,
    crsData,
    crsData,
    crsData,
    crsData,
    crsData,
];