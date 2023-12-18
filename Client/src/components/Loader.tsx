import { treadmill } from 'ldrs'


const Loader= () => {
    treadmill.register()


 return(
    <div className='h-screen w-full flex items-center justify-center'>
    <div>
      <l-treadmill
        size="120"
        speed="1.25" 
        color="#9147d1" 
      ></l-treadmill>
    </div>
  </div>
 
 );

}

export default Loader;