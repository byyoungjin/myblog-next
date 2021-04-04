import React from 'react';
import { format, isThisYear } from 'date-fns';
import Link from 'next/link';

import styles from './style.module.scss';

type Props = {
  postId: number;
  titlePhoto: string;
  title: string;
  subTitle: string;
  createdAt: string;
};

export default function Card({
  postId,
  titlePhoto,
  title,
  subTitle,
  createdAt,
}: Props): JSX.Element {
  const createdDate = new Date(createdAt);
  const formatString = isThisYear(createdDate) ? 'MMM d' : 'MMM d, yyyy';

  const formatedDate = format(createdDate, formatString);

  return (
    <Link href={`/post/${postId}`}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={titlePhoto ?? '/images/default_cover_image.svg'}
          />
        </div>
        <div className={styles.contentContainer}>
          <h2 className={styles.title}>{title}</h2>
          <h4 className={styles.subTitle}>{subTitle}</h4>
          <span>
            <p>{formatedDate}</p>
          </span>
        </div>
      </div>
    </Link>
  );
}