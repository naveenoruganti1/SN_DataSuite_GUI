import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-3'>
                <MDBIcon icon="gem" className="me-3" />
                Company Profile
              </h6>
              <p>
                SN DataSuite is a leading provider of data management solutions. We handle developer-required tools and services.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-2'>
              <h6 className='text-uppercase fw-bold mb-3'>Useful links</h6>
              <p>
                <Link to='/privacy-policy' className='text-reset'>
                  Privacy Policy
                </Link>
              </p>
              <p>
                <Link to='/about' className='text-reset'>
                  About
                </Link>
              </p>
              <p>
                {/* <Link to='/blog' className='text-reset'>
                  Blog
                </Link> */}
                <a href='https://codeblogmoney.com/category/json/' className='text-reset' target='_blank' rel='noopener noreferrer'>
                    Blog
                </a>
              </p>
              <p>
                <Link to='/contact' className='text-reset'>
                  Contact
                </Link>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2025 Copyright:
        <a className='text-reset fw-bold' href='https://sndatasuite.com/'>
          SNDataSuite.com
        </a>
      </div>
    </MDBFooter>
  );
}