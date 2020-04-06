//var fetchPost = require('../../controllers/homeController')

var data = [
    {
      
      title: 'I love coding',
      description: 'I love codingI love codingI love codingI love codingI love codingI love codingI love codingI love coding',
      type: 'Science & Technology',
      postimg: 'https://res.cloudinary.com/dz05jrtvq/image/upload/v1584427113/sparkpost/posts/ovog9c4vsglnalsdkpl7.jpg',
      author: 'rsarkar',
      timest: "2020-03-17T06:38:34.832Z",
      updated_on: "2020-03-17T06:38:34.832Z",
      __v: 0
    },
    {
     
      title: 'I like USA',
      description: 'I like USAI like USAI like USAI like USAI like USAI like USA',
      type: 'Travel',
      postimg: 'https://res.cloudinary.com/dz05jrtvq/image/upload/v1584431084/sparkpost/posts/ala0pqa3npsbekcueva6.jpg',
      author: 'rsarkar',
      timest: "2020-03-17T07:44:46.808Z",
      updated_on: "2020-03-17T07:44:46.808Z",
      __v: 0
    }
  ]
//console.log(fetchPost.getPosts)


document.getElementById("title").innerHTML=`
${data.map((post)=>{
    return post.title
}).join('')}`
