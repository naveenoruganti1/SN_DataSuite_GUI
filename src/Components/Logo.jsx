import React from 'react'
import LogoSrc from "../assets/SNLogo.png";
import Image from 'react-bootstrap/Image';

export default function Logo() {
    return (
        <div className="p-2">
            <Image src={LogoSrc} alt="SN Datasuite Logo"
                width="120"
                height="40"
                className="d-inline-block align-top"
                rounded
            />
        </div>
    )
}
