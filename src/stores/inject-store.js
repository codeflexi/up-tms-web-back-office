import { defineComponent, inject } from 'vue'
import axios from 'axios'
import { key } from '@/stores/inject-store'

export default defineComponent({
  async setup () {
    const injectStore = inject(key)

    if (!injectStore) {
      throw new Error(`${key} is not provided`)
    }

    const { data } = await axios.get('http://example.com')

    return {
        injectStore
    }
  }
})

// import { defineComponent } from 'vue'
// import axios from 'axios'
// import { useRouter } from 'vue-router'

// export default defineComponent({
//   async setup () {
//     const router = useRouter
//     const { data } = await axios.get('http://example.com')
//   }
// })

// Filter Unique key
// const arr = [
//     {
//       name: 'John',
//       location: 'Los Angeles',
//     },
//     {
//       name: 'Kate',
//       location: 'New York',
//     },
//     {
//       name: 'Mike',
//       location: 'New York',
//     },
//   ];
  
//   const unique = arr.filter(
//     (obj, index) =>
//       arr.findIndex((item) => item.location === obj.location) === index
//   );
  
//   /*
//      [
//        { name: 'John', location: 'Los Angeles' },
//        { name: 'Kate', location: 'New York' }
//      ]
//    */
//   console.log(unique);