import bg1 from './assets/img/image_1.jpg';
import bg2 from './assets/img/image_2.jpg';
import bg3 from './assets/img/image_3.jpg';
import img1 from './assets/img/logo_1.png';
import img2 from './assets/img/logo_2.png';
import img3 from './assets/img/logo_3.png';
import teamBack from './assets/img/team_back.png';
import portfolioBack from './assets/img/portfolio_back.png';
import aboutBack from './assets/img/image_5.jpg';
import contactusBack from './assets/img/image_4.jpg';

export const test = {
  mainPage: [
    {
      id: 'main1',
      img: img1,
      title: 'Architecture visualization & animation walk-through',
      bg: bg1,
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: 'main2',
      img: img2,
      title: 'AAA game services',
      bg: bg2,
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      id: 'main3',
      img: img3,
      title: 'Motion grapics & Animation videos',
      bg: bg3,
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  ],
  soclinks: [
    {
      name: 'mail us',
      link: 'https://mail.google.com/mail/u/0/'
    },
    {
      name: 'instagram',
      link: 'http://instagram.com'
    },
    {
      name: 'facebook',
      link: 'https://fb.com'
    },
    {
      name: 'twitter',
      link: 'https://twitter.com'
    },
    {
      name: 'artistation',
      link: 'https://artistation.com'
    },
    {
      name: 'linkedin',
      link: 'https://linkedin.com'
    }
  ],
  team: {
    bg: teamBack,
    title: 'let gets acquainted',
    desc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    members: [
      {
        id: Math.random(),
        img: 'https://randomuser.me/api/portraits/men/75.jpg',
        desc:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        id: Math.random(),
        img: 'https://randomuser.me/api/portraits/men/75.jpg',
        desc:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        id: Math.random(),
        img: 'https://randomuser.me/api/portraits/men/75.jpg',
        desc:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        id: Math.random(),
        img: 'https://randomuser.me/api/portraits/men/75.jpg',
        desc:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    ]
  },
  portfolio: {
    bg: portfolioBack,
    photos: [
      {
        src:
          'https://i.etsystatic.com/11848992/r/il/f38f0d/1275706435/il_570xN.1275706435_2673.jpg',
        thumbnail:
          'https://i.etsystatic.com/11848992/r/il/f38f0d/1275706435/il_570xN.1275706435_2673.jpg',
        caption: 'After Rain (Jeshu John - designerspics.com)'
      },
      {
        src:
          'https://img1.cgtrader.com/items/661828/5c124bedd9/high-detailed-cat-ring-3d-model-obj-mtl-stl-3dm.jpg',
        thumbnail:
          'https://img1.cgtrader.com/items/661828/5c124bedd9/high-detailed-cat-ring-3d-model-obj-mtl-stl-3dm.jpg',

        tags: [
          { value: 'Dragons', title: 'Dragons' },
          { value: 'People', title: 'People' }
        ],
        caption: 'Boats (Jeshu John - designerspics.com)'
      },

      {
        src:
          'https://ksr-ugc.imgix.net/assets/022/538/627/39f99e109cffb61a2ff8b70c5c5c2114_original.png?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1536818123&auto=format&frame=1&q=92&s=c8f312804c8f3e365aed750e95ad4b1e',
        thumbnail:
          'https://ksr-ugc.imgix.net/assets/022/538/627/39f99e109cffb61a2ff8b70c5c5c2114_original.png?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1536818123&auto=format&frame=1&q=92&s=c8f312804c8f3e365aed750e95ad4b1e'
      },

      {
        src:
          'https://i.pinimg.com/originals/ef/85/dc/ef85dc37dfe3e58d24bc7016f73b5478.jpg',
        thumbnail:
          'https://i.pinimg.com/originals/ef/85/dc/ef85dc37dfe3e58d24bc7016f73b5478.jpg'
      },
      {
        src:
          'https://static.turbosquid.com/Preview/001216/136/MI/alien-xenomorph-3D-model_D.jpg',
        thumbnail:
          'https://static.turbosquid.com/Preview/001216/136/MI/alien-xenomorph-3D-model_D.jpg',

        caption: 'After Rain (Jeshu John - designerspics.com)'
      },
      {
        src: 'http://www.doschdesign.com/images2/Red-D3D-CARDEV2-1a.jpg',
        thumbnail: 'http://www.doschdesign.com/images2/Red-D3D-CARDEV2-1a.jpg',

        tags: [
          { value: 'Ocean', title: 'Ocean' },
          { value: 'People', title: 'People' }
        ],
        caption: 'Boats (Jeshu John - designerspics.com)'
      }
    ]
  },
  about: {
    title: 'about us',
    desc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    bg: aboutBack
  },
  contactus: {
    bg: contactusBack,
    title: 'INTERESTED PARTNERING WITH US?',
    desc:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    contacts: ['+37477123456', 'contact@garageb14.com'],
    address: [
      '575 Madison Ave, New York ,NY 10022USA',
      '6/1 Abelyan Str, Yerevan , Armenia'
    ]
  }
};
