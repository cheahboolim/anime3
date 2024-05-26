import { Metadata } from 'next'
import React from 'react'
import styles from "./page.module.css"
import newsApi from '@/app/api/consumetNews'
import Image from 'next/image'
import Link from 'next/link'
import NewsSwiperContainer from './components/NewsSwiperContainer'
import SvgCalendar from "@/public/assets/calendar3.svg"
import { News } from '../ts/interfaces/newsInterface'
import NewsCard from './components/NewsCard'

export const revalidate = 1800 // revalidate cached data every 30 min

export const metadata: Metadata = {
    title: 'News | AniProject',
    description: 'See the latest news about a variety of animes, mangas and movies.',
}

async function NewsHomePage() {

    const news = await newsApi.getNews() as News[]

    const animesNews = await newsApi.getNews("anime") as News[]
    const mangasNews = await newsApi.getNews("manga") as News[]
    const gamesNews = await newsApi.getNews("games") as News[]
    const industryNews = await newsApi.getNews("industry") as News[]

    return (
        (news && mangasNews && gamesNews && industryNews) && (
            <main id={styles.container}>

                <h1>TRENDING NOW</h1>

                <section id={styles.highlight}>

                    <div id={styles.highlighted_news}>

                        <div id={styles.main_news}>

                            <div className={styles.image_container}>
                                <Image
                                    src={news[0]?.thumbnail || ""}
                                    alt={news[0].title}
                                    fill
                                    sizes='(max-width: 529px) 100vw, (max-width: 1019px) 40vw, (max-width: 1019px) 35vw, (max-width: 1259px) 30vw, 289px'
                                />
                            </div>

                            <div className={styles.highlight_title}>
                                {news[0]?.topics[0] && (
                                    <Link className={styles.topic} href={`/news?topic=${news[0].topics[0]}`}>{news[0].topics[0].toUpperCase()}</Link>
                                )}

                                <h2><Link href={`/news/${news[0].id.replace(/\/?daily-briefs\//, "")}`}>{news[0].title}</Link></h2>
                            </div>
                        </div>

                        <div id={styles.news_second}>
                            {news.slice(1, 4).map((item, key) => (

                                <div className={styles.hero_news_container} key={key}>

                                    <div className={styles.image_container}>
                                        <Link href={`/news/${item.id.replace(/\/?daily-briefs\//, "")}`}>
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.title}
                                                fill
                                                sizes='(max-width: 1020px) 33vw, (max-width: 1259px) 11vw, 239px'
                                            />
                                        </Link>
                                    </div>

                                    <div className={styles.highlight_title}>
                                        {news[0]?.topics[0] && (
                                            <Link className={styles.topic} href={`/news?topic=${item.topics[0]}`}>{item.topics[0].toUpperCase()}</Link>
                                        )}

                                        <h2><Link href={`/news/${item.id.replace(/\/?daily-briefs\//, "")}`}>{item.title}</Link></h2>
                                    </div>
                                </div>

                            ))}
                        </div>

                    </div>

                    <div id={styles.hero_news_list}>
                        {news.slice(4, 9).map((item, key) => (

                            <NewsCard key={key} data={item} />

                        ))}
                    </div>

                </section>

                <section id={styles.animes_container}>

                    <h2>Recent Animes News</h2>

                    <NewsSwiperContainer
                        data={animesNews}
                        options={{
                            slidesPerView: 1.2,
                            bp480: 2.2,
                            bp740: 3.2,
                            bp1275: 3.2,
                        }}
                    />

                </section >

                <section id={styles.manga_games_industry_container}>

                    <div className={styles.list_container}>

                        <h2>MANGAS</h2>

                        <div className={styles.highlighted_container}>

                            <div className={styles.image_container}>
                                <Link href={`/news/${mangasNews[0].id.replace(/\/?daily-briefs\//, "")}`}>
                                    <Image
                                        src={mangasNews[0].thumbnail || ""}
                                        alt={mangasNews[0].title}
                                        fill
                                        sizes='(max-width: 599px) 100vw, (max-width: 1259px) 33vw, 379px'
                                    />
                                </Link>
                            </div>

                            <div className={styles.highlight_title}>
                                {news[0]?.topics[0] && (
                                    <Link className={styles.topic} href={`/news?topic=${mangasNews[0].topics[0]}`}>{mangasNews[0].topics[0].toUpperCase()}</Link>
                                )}

                                <h2>
                                    <Link href={`/news/${mangasNews[0].id.replace(/\/?daily-briefs\//, "")}`}>
                                        {mangasNews[0].title}
                                    </Link>
                                </h2>
                            </div>
                        </div>

                        {mangasNews.slice(1, 6).map((item, key) => (

                            <div className={styles.item_container} key={key}>

                                <div className={styles.image_container}>
                                    <Link href={`/news/${item.id.replace(/\/?daily-briefs\//, "")}`}>
                                        <Image
                                            src={item.thumbnail || ""}
                                            alt={item.title}
                                            fill
                                            sizes='(max-width: 599px) 40vw, (max-width: 1259px) 15vw, 133px'
                                        />
                                    </Link>
                                </div>

                                <div className={`${styles.highlight_title} ${styles.item_title_container}`}>

                                    <h2>
                                        <Link href={`/news/${item.id.replace(/\/?daily-briefs\//, "")}`}>
                                            {item.title}
                                        </Link>
                                    </h2>

                                    {item.uploadedAt && (
                                        <small><SvgCalendar width={16} height={16} alt={"Calendar"} />{item.uploadedAt}</small>
                                    )}

                                </div>
                            </div>

                        ))}
                    </div>

                    <div className={styles.list_container}>

                        <h2>GAMES</h2>

                        <div className={styles.highlighted_container}>

                            <div className={styles.image_container}>
                                <Link href={`/news/${gamesNews[0].id.replace(/\/?daily-briefs\//, "")}`}>
                                    <Image
                                        src={gamesNews[0].thumbnail || ""}
                                        alt={gamesNews[0].title}
                                        fill
                                        sizes='(max-width: 599px) 100vw, (max-width: 1259px) 33vw, 379px'
                                    />
                                </Link>
                            </div>

                            <div className={styles.highlight_title}>
                                {news[0]?.topics[0] && (
                                    <Link className={styles.topic} href={`/news?topic=${gamesNews[0].topics[0]}`}>
                                        {gamesNews[0].topics[0].toUpperCase()}
                                    </Link>
                                )}

                                <h2><Link href={`/news/${gamesNews[0].id.replace(/\/?daily-briefs\//, "")}`}>{gamesNews[0].title}</Link></h2>
                            </div>
                        </div>

                        {gamesNews.slice(1, 6).map((item, key) => (

                            <div className={styles.item_container} key={key}>

                                <div className={styles.image_container}>
                                    <Link href={`/news/${item.id.replace(/\/?daily-briefs\//, "")}`}>
                                        <Image
                                            src={item.thumbnail || ""}
                                            alt={item.title}
                                            fill
                                            sizes='(max-width: 599px) 40vw, (max-width: 1259px) 15vw, 133px'
                                        />
                                    </Link>
                                </div>

                                <div className={`${styles.highlight_title} ${styles.item_title_container}`}>

                                    <h2><Link href={`/news/${item.id.replace(/\/?daily-briefs\//, "")}`}>{item.title}</Link></h2>

                                    {item.uploadedAt && (
                                        <small><SvgCalendar width={16} height={16} alt={"Calendar"} />{item.uploadedAt}</small>
                                    )}

                                </div>
                            </div>

                        ))}
                    </div>

                    <div className={styles.list_container}>

                        <h2>INDUSTRY</h2>

                        <div className={styles.highlighted_container}>

                            <div className={styles.image_container}>
                                <Link href={`/news/${industryNews[0].id.replace(/\/?daily-briefs\//, "")}`}>
                                    <Image
                                        src={industryNews[0].thumbnail || ""}
                                        alt={industryNews[0].title}
                                        fill
                                        sizes='(max-width: 599px) 100vw, (max-width: 1259px) 33vw, 379px'
                                    />
                                </Link>
                            </div>

                            <div className={styles.highlight_title}>
                                {news[0]?.topics[0] && (
                                    <Link className={styles.topic} href={`/news?topic=${industryNews[0].topics[0]}`}>
                                        {industryNews[0].topics[0].toUpperCase()}
                                    </Link>
                                )}

                                <h2><Link href={`/news/${industryNews[0].id.replace(/\/?daily-briefs\//, "")}`}>{industryNews[0].title}</Link></h2>
                            </div>
                        </div>

                        {industryNews.slice(1, 6).map((item, key) => (

                            <div className={styles.item_container} key={key}>

                                <div className={styles.image_container}>
                                    <Link href={`/news/${item.id.replace(/\/?daily-briefs\//, "")}`}>
                                        <Image
                                            src={item.thumbnail || ""}
                                            alt={item.title}
                                            fill
                                            sizes='(max-width: 599px) 40vw, (max-width: 1259px) 15vw, 133px'
                                        />
                                    </Link>
                                </div>

                                <div className={`${styles.highlight_title} ${styles.item_title_container}`}>

                                    <h2><Link href={`/news/${item.id.replace(/\/?daily-briefs\//, "")}`}>{item.title}</Link></h2>

                                    {item.uploadedAt && (
                                        <small><SvgCalendar width={16} height={16} alt={"Calendar"} />{item.uploadedAt}</small>
                                    )}

                                </div>
                            </div>

                        ))}
                    </div>

                </section>

            </main >
        )
    )
}

export default NewsHomePage