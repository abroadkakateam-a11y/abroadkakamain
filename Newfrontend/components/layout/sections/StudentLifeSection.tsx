import { FocusCards } from "@/components/ui/focus-cards";

export function StudentLifeSection() {
  const cards = [
    {
      title: "Indian Hostel Life",
      src: "https://images.unsplash.com/photo-1604586381428-33d650d21c93?q=80&w=3080&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Enjoying Indian Food Abroad",
      src: "https://images.unsplash.com/photo-1613145991266-9c3c59c16fb2?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Campus Life in Kyrgyzstan",
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Festival Celebrations Abroad",
      src: "https://images.unsplash.com/photo-1570813099580-4f81bc49a09c?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Study Time with Friends",
      src: "https://images.unsplash.com/photo-1590080877034-18eac070f74e?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Exploring the Local City",
      src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  return (
    <section id="student-life" className="container py-24 sm:py-32">
      <h2 className="text-lg text-[#00A3D3] text-center mb-2 tracking-wider font-semibold">
        Student Life
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Life Beyond Classrooms
      </h2>

      <p className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        At Abroad Kaka, your journey isn't just about academics.  
        It’s about living your dream — studying, exploring, celebrating, and growing together.
      </p>

      <FocusCards cards={cards} />
    </section>
  );
}
