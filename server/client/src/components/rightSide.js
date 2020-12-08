import React, { useState } from "react";

import { Image, Container } from "react-bootstrap";

const RightSide = ({ src, imgWidth, imgHeight }) => {

    return (
        <Container style = {{ padding: 0}} >
            <Image style = {{ width: imgWidth, height: imgHeight }} src = {src} />
        </Container>
    )

}

export default RightSide