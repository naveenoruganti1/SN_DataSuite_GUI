import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
    <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
      <div className='me-5 d-none d-lg-block'>
        <span>Get connected with us on social networks:</span>
      </div>

      <div>
        <a href='' className='me-4 text-reset'>
          <MDBIcon fab icon="facebook-f" />
        </a>
        <a href='' className='me-4 text-reset'>
          <MDBIcon fab icon="twitter" />
        </a>
        <a href='' className='me-4 text-reset'>
          <MDBIcon fab icon="google" />
        </a>
        <a href='' className='me-4 text-reset'>
          <MDBIcon fab icon="instagram" />
        </a>
        <a href='' className='me-4 text-reset'>
          <MDBIcon fab icon="linkedin" />
        </a>
        <a href='' className='me-4 text-reset'>
          <MDBIcon fab icon="github" />
        </a>
      </div>
    </section>

    <section className=''>
      <MDBContainer className='text-center text-md-start mt-5'>
        <MDBRow className='mt-3'>
          <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>
              <MDBIcon icon="gem" className="me-3" />
              Company name
            </h6>
            <p>
            SN DataSuite is a leading provider of data management solutions. We handle developer-required tools and services.
            </p>
          </MDBCol>

          {/* <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
            <p>
              <a href='#!' className='text-reset'>
                Angular
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                React
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Vue
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Laravel
              </a>
            </p>
          </MDBCol> */}

          <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
            <p>
              <a href='#!' className='text-reset'>
                Xml to Java Class
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Xml to Excel
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Json to Java Class
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Json to Excel
              </a>
            </p>
          </MDBCol>

          <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
            <p>
              <MDBIcon icon="home" className="me-2" />
              Andhra Pradesh, India
            </p>
            <p>
              <MDBIcon icon="envelope" className="me-3" />
              sndatasuite@outlook.com
            </p>
            <p>
              <MDBIcon icon="phone" className="me-3" /> +91 1234567890
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      © 2025 Copyright:
      <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
        SNDataSuite.com
      </a>
    </div>
  </MDBFooter>
  );
}
