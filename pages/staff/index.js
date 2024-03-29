import React, { useEffect, useState } from 'react'
import styles from '../../styles/BmaPage.module.scss'
import Link1 from '../../components/Link'
import Staff from '../../components/Staff'
import News from '../../components/News'
import stylesBtn from '../../styles/Button.module.scss'
import AOS from "aos";
import "aos/dist/aos.css";
import Head from 'next/head'
import axios from 'axios'
import PresentationCard from '../../components/PresentationCard'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Link from 'next/link'


function index() {
    var lang = ["AZ" , "EN" , "RU"]
    const [langM, setlangM] = useState(typeof window !== "undefined" && (sessionStorage.getItem('lang') === null ? lang[0] : sessionStorage.getItem('lang')))
    
    const [team, setteam] = useState([])
    const [events, setevents] = useState([])

    const getDatas = async () => {
        if (langM === 'AZ') {
            let response1 = await axios.get('https://admin.creativebma.az/api/team-api')
            let response2 = await axios.get('https://admin.creativebma.az/api/blog-tedbirler-take-3-api')
            setteam(response1.data)
            setevents(response2.data)
        }
        else if(langM === 'EN')
        {
            let response1 = await axios.get('https://admin.creativebma.az/api/en/team-api')
            let response2 = await axios.get('https://admin.creativebma.az/api/en/blog-tedbirler-take-3-api')
            setteam(response1.data)
            setevents(response2.data)
        }
        else if(langM === 'RU') 
        {
            let response1 = await axios.get('https://admin.creativebma.az/api/ru/team-api')
            let response2 = await axios.get('https://admin.creativebma.az/api/ru/blog-tedbirler-take-3-api')
            setteam(response1.data)
            setevents(response2.data)
        }
        else{}
    }

    useEffect(() => {
        getDatas()
        AOS.init();
        AOS.refresh();
    }, [])
    
    const presentations = [
        { id: 1 , name:"by Osman Mustafazadə" , title:"Guess the classical music" , link:'https://admin.creativebma.az/public/uploads/ppt1.pptx'},
        { id: 2 , name:"by Nazrin Babayeva" , title:"The Pianist who played his own rules" , link:'https://admin.creativebma.az/public/uploads/ppt2.pptx'},
        { id: 3 , name:"by Müjgan Məmmədli" , title:"The Photos in history" , link:'https://admin.creativebma.az/public/uploads/ppt3.pptx'},
    ]

    return (
        <>
            <Head>
                <title>{langM === "AZ" && `BMA sahibkarlıq mərkəzi` || langM === "EN" && `BMA Entrepreneurship Center` || langM === "RU" && `Центр предпринимательства BMA`}</title>
            </Head>
            <div className={styles.bmaPage + " page "}>
                <Link1 link={langM === "AZ" && `BMA sahibkarlıq mərkəzi` || langM === "EN" && `BMA Entrepreneurship Center` || langM === "RU" && `Центр предпринимательства BMA`} href="/staff"/>
                <h1 data-aos="fade-up"  className={styles.bmaTitle + " title-b-desk  pageTitle"} >{langM === "AZ" && `Haqqımızda` || langM === "EN" && `About Us` || langM === "RU" && `О нас`}</h1>
                <p data-aos="fade-up"  className="text mt30">
                    {langM === "AZ" && `Bakı Musiqi Akademiyasının Sahibkarlıq Mərkəzi, British Council tərəfindən maliyyələşdirilən Creative Spark: Ali Təhsil Müəssisə Proqramı çərçivəsində tələbə və məzunlar arasında yaradıcılıq və musiqi sahibkarlığının artırılması məqsədi ilə hazırlanmış yeni bir proqramdır. Hədəf gənc yaradıcı insanların fikirlərini yeni karyera imkanlarına doğru motivasiya və dəstək verən fəaliyyətə çevirməkdir. ` 
                    || langM === "EN" && `The Entrepreneurship Center of Baku Music Academy is a new program developed within the framework of Creative Spark: Higher Education Enterprise Programme funded by the British Council aimed at increasing awareness of creative and music entrepreneurship among students and graduates. The target is to turn ideas of young creative people into action providing motivation and support towards new career opportunities. ` 
                    || langM === "RU" && `Центр предпринимательства Бакинской музыкальной академии - это новая программа, разработанная в рамках  Creative Spark: Higher Education Enterprise, программы финансируемой Британским Советом, направленная на повышение осведомленности о творческом и музыкальном предпринимательстве среди студентов и выпускников. Цель - превратить идеи молодых творческих людей в действия, обеспечивающие мотивацию и поддержку для открытия новых карьерных возможностей. `}
                </p>

                <div className={styles.staffCont + " mt50"}>
                    <h2 data-aos="fade-left" className={styles.aboutTitle + " title-b-desk  pageTitle "}>{langM === "AZ" && `Əməkdaşlar` || langM === "EN" && `Staff` || langM === "RU" && `Персонал`} </h2>
                    <div data-aos="fade-right" className={styles.staffs}>
                        {team.map(student => <Staff id={student.id} image={student.image} name={student.name_surname}/>)}
                    </div>
                </div>

                <div className={styles.staffCont + " mt100"}>
                    <h2 data-aos="fade-right" className={styles.aboutTitle + " title-b-desk  pageTitle "}>{langM === "AZ" && `Təqdimatlar` || langM === "EN" && `Presentations` || langM === "RU" && `Презентаций`} </h2>
                    <div data-aos="fade-left" className={styles.staffs}>
                        {presentations.map(value => <PresentationCard number={value.id}  name={value.name} title={value.title} link={value.link}/>)}
                    </div>
                    <Link href="/presentations"><button data-aos="fade-up" className={stylesBtn.buttonEffect + " button-text"}><KeyboardArrowRightIcon/> {langM === "AZ" && `Hamısına Bax` || langM === "EN" && `All` || langM === "RU" && `Читать далее`}</button></Link>
                </div>

                <div className={styles.staffCont + " mt100"}>
                    <h2 data-aos="fade-right" className={styles.aboutTitle + " title-b-desk  pageTitle "}>{langM === "AZ" && `Tədbirlər` || langM === "EN" && `Events` || langM === "RU" && `События`} </h2>
                    <div data-aos="fade-left" className={styles.staffs}>
                        {events.map(news => <News id={news.id} image={news.img} title={news.title} content={news.content} />)}
                    </div>
                    <Link href="/news"><button data-aos="fade-up" className={stylesBtn.buttonEffect + " button-text"}><KeyboardArrowRightIcon/> {langM === "AZ" && `Hamısına Bax` || langM === "EN" && `All` || langM === "RU" && `Читать далее`}</button></Link>
                </div>
                
            </div>
        </>
    )
}

export default index



// export const getStaticProps = async (context) => {
//     const res = await fetch(`https://admin.creativebma.az/api/team-api`)
//     const teams = await res.json()
//     const res1 = await fetch(`https://admin.creativebma.az/api/blog-tedbirler-take-3-api`)
//     const events = await res1.json()
//     return {
//         props:{teams , events}
//     }
// }