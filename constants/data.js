import {
    EnvironmentOutlined,
    FacebookFilled,
    GithubFilled, GlobalOutlined,
    InstagramFilled,
    LinkedinFilled, MailFilled,
    PhoneFilled,
    YoutubeFilled
} from "@ant-design/icons";

export const listSocialResume = [
    {
        link: 'https://github.com/thansonbg',
        username: 'thansonbg',
        icon: <GithubFilled />
    },
    {
        link: '',
        username: '',
        icon: <LinkedinFilled />
    },
    {
        link: '',
        username: '',
        icon: <InstagramFilled />
    },
    {
        link: 'https://www.facebook.com/SonSro9x',
        username: 'Trầm Đình Thắng',
        icon: <FacebookFilled />
    },
    {
        link: '',
        username: '',
        icon: <YoutubeFilled />
    }
]

export const listContact = [
    {
        icon: <PhoneFilled />,
        value: '0868724834'
    },
    {
        icon: <MailFilled />,
        value: 'thanson198@gmail.com'
    },
    {
        icon: <GlobalOutlined />,
        value: ''
    },
    {
        icon: <EnvironmentOutlined />,
        value: ''
    }
]

export const dataInfoMe = {
    name: 'Thân Văn Sơn',
    role: 'Font End Developer',
    bio_begin: 'Xin chào, Mình tên Thân Văn Sơn. Mình là một full Font End Developer. Mình tham gia vào việc phát triển các ứng dụng website. Mình tạo ra website cá nhân này để giới thiệu về bản thân mình và',
    bio_link: ' viết các bài chia sẻ của cá nhân mình. ',
    bio_end: 'Rất mong nhận được sự ủng hộ của các bạn!',
}

export const dataResume = {
    media: 'Tôi có 1 năm kinh nghiệm xây dựng và phát triển web app cho bản thân ^^. Dưới đây là tổng quan nhanh về kinh nghiệm, bộ kỹ năng chính của tôi và công nghệ mà tôi đã sử dụng...',
    experiences: [
        {
            title: 'Font End Developer',
            meta: 'SILICO Việt Nam | 11/2019 - Nay',
            body:  '<p><span>Tham gia phát triển các dự án web application và mobile application của công ty.</span></p><p><span>Công nghệ sử dụng trong suốt trong các dự án :</span></p><ul style="list-style: disc!important; margin-left: 1rem!important;"><li><span>Backend : Symfony ( PHP )</span></li><li><span>Frontend :</span><ul style="list-style: revert!important; margin-left: 1rem!important;"><li><span>Web App : React JS ( JavaScript )</span></li><li><span>Mobile App : Flutter ( Dart )</span></li></ul></li><li><span>Cơ sở dữ liệu : PostgresQL</span></li> <li><span>Công nghệ khác : Elasticsearch, Realtime, ...</span></li></ul>',
            bodyHtml: true
        }
    ],
    projects: [
        {
            title: 'Phần mềm quản lý doanh nghiệp',
            meta: 'Dự án công ty',
            body: 'Xây dựng giao diện người dùng. Kết hợp các module nhỏ thành một module lớn.'
        },
        {
            title: 'Web App đăng ký tuyển sinh của trường đại học',
            meta: 'Dự án công ty',
            body: 'Tham gia, đóng góp vào quá trình xây dựng cở sở dữ liệu, Restful API, giao diện người dùng. Sử dụng các API thanh toán của bên thứ ba.'
        },
        {
            title: 'Web App đăng ký sửa ống nước ( Giao tiếp giữa khách hàng và bên thợ sửa )',
            meta: 'Dự án công ty',
            body: 'Tham gia, đóng góp vào quá trình xây dựng cở sở dữ liệu, Restful API, giao diện người dùng. Sử dụng các API thanh toán của bên thứ ba.'
        },
        {
            title: 'Ứng dụng di động dành cho vận chuyển',
            meta: 'Dự án công ty',
            body: 'Xây dựng giao diện người dùng với các chức năng yêu cầu. Áp dụng realtime vào việc quản lý vận chuyển, sử dụng một số phương pháp quản lý state trong flutter ( Provider, BLOC, ... )'
        }
    ],
    technicals: [
        'JavaScript/React/Node/Next',
        'Dart/Flutter',
        'PHP/Symfony',
        'PostgresSQL/Mongodb',
        'Thiết kế hướng đối tượng',
        'Thiết kế triển khai cơ sở dữ liệu'
    ],
    professionals: [
        'Giải quyết vấn đề',
        'Làm việc nhóm',
        'Quản lý thời gian'
    ],
    educations: [
        {
            title: 'Đại học Bách kkoa Hà Nội | Hanoi University Of Science and Technology',
            meta: 'Hà Nội | 2017 - 2022'
        }
    ],
    languages: [
        'Tiếng Anh'
    ],
    interests: [
        'Bóng chuyền',
        'Cầu lông',
        'Chạy'
    ]
}
