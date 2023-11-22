import {motion} from "framer-motion"
import '../Styles/AnimationTiles.css'

function AnimationTitles({title, className}) {
  const hVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const spanVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return(
    <motion.h1 id="motion"
    variants={hVariants}
    initial="hidden"
    whileInView="visible"
    className={className}
  >
    {title.split("\n").map((line, index) => (
      <p key={index}>
        {line.split(" ").map((word, index) => (
          <motion.span 
            className={word === "Financial" || word === "craft" ? "highlight" : ""} 
            variants={spanVariants} 
            key={index}
          >
            {word + " "}
          </motion.span>
        ))}
      </p>
    ))}
  </motion.h1>
  )
}

export default AnimationTitles
