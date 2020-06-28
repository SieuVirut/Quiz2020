import React from 'react'
import { Carousel } from 'antd'
import '../../sass/AuthLayout.scss'

import img1 from '../../../resources/images/1.png'
import img2 from '../../../resources/images/2.png'
import img3 from '../../../resources/images/3.png'
import img4 from '../../../resources/images/4.png'
import img5 from '../../../resources/images/5.png'
import img6 from '../../../resources/images/6.png'
export default () => {
    return <div className='about-project'>
        <Carousel autoplay >
            <div>
                <img src={img1} />
            </div>
            <div>
                <img src={img2} />
            </div>
            <div>
                <img src={img3} />
            </div>
            <div>
                <img src={img4} />
            </div>
            <div>
                <img src={img5} />
            </div>
            <div>
                <img src={img6} />
            </div>
        </Carousel>
    </div>
}