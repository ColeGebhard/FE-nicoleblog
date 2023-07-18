import React, { useState, useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './About.css';



const About = (props) => {
    
    return(
        <div className="aboutPage">
            <img src="https://dummyimage.com/360x640/fff/aaa" alt="portrait"/>
            <span className="aboutText">
                <h1>Environmentalist, <br/>
                Lorum Ipsum, <br/>
                Activist.</h1>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo ipsum ac pretium porttitor. Suspendisse rutrum lorem quis elit luctus lacinia. Praesent pulvinar ultricies quam ut blandit. Nulla sollicitudin ipsum a nulla porta fringilla. Etiam tristique est a fermentum sagittis. Nam fermentum, nulla a tempor mollis, nunc arcu condimentum purus, a auctor libero lorem at libero. Ut vitae arcu maximus nibh convallis suscipit. Integer vitae pulvinar ligula. Mauris fringilla, mauris sed aliquet cursus, massa dolor pulvinar metus, in dignissim metus libero eu leo. Nunc nunc mi, porttitor sit amet imperdiet vel, feugiat sit amet quam. Duis vitae odio suscipit, elementum nulla sit amet, egestas sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec dapibus molestie nisi ac porta.</p>
                <p>Praesent varius vulputate mauris et maximus. Vestibulum ut ex leo. Nam a massa odio. Nullam sit amet condimentum massa. Donec commodo dictum aliquam. Sed convallis et nunc a eleifend. Pellentesque neque risus, porta eget libero pretium, gravida eleifend velit. Duis vulputate nisl orci, vitae blandit magna rutrum ac. Donec id malesuada ipsum, at varius erat. Mauris et ex maximus, convallis libero vitae, tincidunt enim. Suspendisse nec urna eu tortor pretium luctus sed nec massa.</p>
                <p>Aliquam faucibus consequat scelerisque. In auctor hendrerit leo quis pretium. Donec suscipit laoreet massa et efficitur. In a fermentum elit. Nulla nec imperdiet dolor. Nunc facilisis pellentesque velit id hendrerit. Suspendisse nec blandit dui. Aliquam nec aliquet mi.</p>
            </span>
        </div>
    )
    
}

export default About;