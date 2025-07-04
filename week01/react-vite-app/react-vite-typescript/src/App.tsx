import Section from "./components/Lesson04/AbContainer/Section";
import State01 from "./components/Lesson04/State01/State01";
import Rate from "./components/Lesson04/Rate/Rate";
import { SlideWithThumb } from "./components/Lesson04/SlideWithThumb/SlideWithThumb";
import TabsButton from "./components/Lesson04/TabButtons/TabsButton";
import Accordion from "./components/Lesson04/ButtonAccordions/Accordions";
import { Slide2 } from "./components/Lesson04/Slide2/Slide2";
import { LightboxGallery } from "./components/Lesson04/LightboxGallery/LightboxGallery";

const imgSlideWithThumb = [
  "https://picsum.photos/id/1015/600/400",
  "https://picsum.photos/id/1016/600/400",
  "https://picsum.photos/id/1018/600/400",
  "https://picsum.photos/id/1019/600/400",
];

const tabData = [
  {
    label: "HISTORY",
    content:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit...",
  },
  {
    label: "APPROACH",
    content:
      "Approach content: omnis voluptas assumenda est, omnis dolor repellendus...",
  },
  {
    label: "CULTURE",
    content:
      "Culture content: temporibus autem quibusdam et aut officiis debitis aut rerum...",
  },
  {
    label: "METHOD",
    content:
      "Method content: saepe eveniet ut et voluptates repudiandae sint et molestiae...",
  },
];

const accordionData = [
  {
    title: "HISTORY",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...",
  },
  {
    title: "APPROACH",
    content:
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto...",
  },
  {
    title: "CULTURE",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...",
  },
  {
    title: "METHOD",
    content:
      "Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt...",
  },
];

function App() {
  return (
    <div className={"bg-white"}>
      <Section>
        <State01 />
      </Section>
      <Section>
        <Rate />
      </Section>
      <Section>
        <h1 className="text-2xl font-bold mb-6 text-left">Slide with thumb</h1>
        <SlideWithThumb images={imgSlideWithThumb} />
      </Section>
      <Section>
        <h1 className="text-2xl font-bold mb-6 text-left">Button Tabs</h1>
        <TabsButton tabs={tabData} />
      </Section>
      <Section>
        <div className="flex p-6 flex-row gap-3">
          <div>
            <p>Single Accordions</p>
            <Accordion data={accordionData} mode="single" />
          </div>
          <div>
            <p>Multi Accordions</p>
            <Accordion data={accordionData} mode="multi" />
          </div>
        </div>
      </Section>

      <Section>
        <div>
          <Slide2 images={imgSlideWithThumb} />
        </div>
      </Section>
      <Section>
        <span>Lightbox Gallery</span>
        <LightboxGallery images={imgSlideWithThumb} />
      </Section>
    </div>
  );
}

export default App;
