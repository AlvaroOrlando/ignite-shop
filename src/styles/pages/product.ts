import { styled } from "@stitches/react";

export const ProductContainer = styled('main', {
    display:'grid',
    gridTemplateColumns:'1fr 1fr',
    alignItems:'stretch',
    gap:'4rem',

    maxWidth:'1180px',
    margin:'0px auto'

})

export const ImageContainer = styled('div', {
    width:'100%',
    maxWidth:'576px',
    height:'calc(656px - 0.65rem)',
    background:'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)', 
    borderRadius:'8px',
    padding:'0.25rem',

    display:'flex',
    alignItems:'center',
    justifyContent:'center',

    img: {
        objectFit:'cover',
        transition: 'transform 0.5s',
        cursor:'zoom-in',

        '&:hover':{
            transform: 'scale(1.2)',
        }
    },

   
})

export const ProductDetails = styled('div', {
    display:'flex',
    flexDirection:'column',

    h1: {
        fontSize:'$2xl',
        color:'$gray300'
    },

    span: {
        marginTop:'1rem',
        display:'block',
        fontSize:'$2xl',
        color:'$green300'
    },

    p:{
        marginTop:'2.5rem',
        fontSize:'$md',
        lineHeight:'1.6',
        color:'$gray300'
    },

    button:{
        marginTop:'auto',
        padding:'1.25rem',

        border:'0px',
        borderRadius:'8px',

        backgroundColor:'$green500',
        color:'$white',

        cursor:'pointer',

        fontSize:'$md',
        fontWeight:'bold',

        '&:hover': {
            backgroundColor:'$green300'
        },
    }
})

