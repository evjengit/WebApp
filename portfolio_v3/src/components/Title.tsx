type TitleProps = {
    title: string;
    level: string;
  };
  
  export default function Title({ title, level }: TitleProps) {
      if (level === "1")
        return <h1 className="title">{title}</h1>;
      if (level === "2")
        return <h2 className="title">{title}</h2>;
      else return
  }