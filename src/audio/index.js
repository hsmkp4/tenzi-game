import climber from "./theclimber-simon folwar.mp3";
import secondWhoosh from "./secondW.mp3";
import rollBtn2 from "./rollBtn2.mp3";
import redMist from "./redMist.mp3";

const bgMusic = new Audio(climber);
bgMusic.loop = true;
bgMusic.volume = 0.4;

const roolMusic = new Audio(secondWhoosh);
const roolMusic2 = new Audio(rollBtn2);
const endMusic = new Audio(redMist);

export { bgMusic, roolMusic, endMusic, roolMusic2 };
