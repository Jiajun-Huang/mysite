import Link from "next/link";
import style from "./brief.module.scss";
interface BriefProps {
  title: string;
  date: Date;
  views: number;
  tags: Tag[];
  category: Category;
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
  console.log(url);
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
              <span key={index} className={style.tag}>
                {tag.name}
              </span>
            ))}
          </div>
          <span className={style.category}>{category.name}</span>
        </div>
        <p>{abstract}</p>
      </div>
    </Link>
  );
}

export default Brief;
