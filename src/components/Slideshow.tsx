
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  'https://scontent.fhan2-5.fna.fbcdn.net/v/t1.18169-9/11220139_757219051070703_2394365749370473791_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=n7FZd_1eS9QQ7kNvgHw7KTF&_nc_ht=scontent.fhan2-5.fna&gid=AgnEUL-hknDftAlaxg20spd&oh=00_AYDsNzzB4czEYugEMnzhFbjFqnWNfuJ3WwEqiPt2GtuhlQ&oe=66D30022',
  'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.18169-9/11891117_757219031070705_2117705420267605621_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_ohc=_KcyDvO5oekQ7kNvgG3OvWv&_nc_ht=scontent.fhan2-4.fna&gid=A6JNRkNr90TuAaU-dJPguy3&oh=00_AYAKgd7YLiDF0ml3NhrktQayM05pHIsSLc1I74E0gtbT0w&oe=66D2DCE3',
  'https://intphcm.com/data/upload/banner-thoi-trang-tuoi.jpg'
];

const Slideshow  = () => {
  return (
    <div className="slide-container">
    <Slide duration={2000}>
        {slideImages.map((image, index) => (
            <div className="each-slide container-fluid banner" key={index}>
                <div className='backgroundImage'>
                    <img src={image}  />
                </div>
            </div>
        ))}
    </Slide>
</div> )


 
};

export default Slideshow;
