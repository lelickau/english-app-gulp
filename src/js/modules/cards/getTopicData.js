import a1 from '../../data/data-a1.json';

export const getTopicData = (level, topic) => {
    const levels = {
        a1
    }
    return levels[level].filter(elem => elem.thema === topic)
}