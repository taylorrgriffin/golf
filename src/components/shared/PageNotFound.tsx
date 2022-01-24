import React from 'react';

export const PageNotFound = () => {
  return (
    <div style={styles.container}>
      <p style={{ textAlign: "center" }}>
        We couldn't find that page.
      </p>
    </div>
  );
}

let styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'left',
    color: 'white',
    fontSize: 'calc(8px + 2vmin)',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    textAlign: 'left' as const,
    flex: '1 1 auto',
    // backgroundColor: PAGE_BACKGROUND
  },
  heading: {
    textAlign: 'center',
    fontSize: '4em',
    fontWeight: 'bolder',
  },
  subHeading: {
    textAlign: 'center',
    fontSize: '2em',
    fontWeight: 'bolder',
  },
}