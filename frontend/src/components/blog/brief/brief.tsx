import Link from "next/link";
import style from "./brief.module.scss";
interface BriefProps {
  title: string;
  date: Date;
  views: number;
  tags: string[];
  category: string;
  abstract: string;
  url: string;
}

function Brief({
  title,
  date,
  views,
  tags,
  category,
  abstract,
  url,
}: BriefProps) {
  const dateStr = date.toLocaleDateString();

  return (
    <Link href={url} className={style.link}>
      <div className={style.brief}>
        <h2>{title}</h2>
        <div className={style.details}>
          <span>{dateStr}</span>
          <span>{views} views</span>
        </div>
        <div className={style.tagsCategory}>
          <div className={style.tags}>
            {tags.map((tag, index) => (
              <object key={index}>
                <span key={index} className={style.tag}>
                  <Link href={"/" + tag} className={style.link}>
                    {tag}
                  </Link>
                </span>
              </object>
            ))}
          </div>
          <span className={style.category}>{category}</span>
        </div>
        <p>{abstract}</p>
      </div>
    </Link>
  );
}

export default Brief;
