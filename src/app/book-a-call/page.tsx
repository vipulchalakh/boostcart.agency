import { redirect } from "next/navigation";

/** Every "Book a call" button opens the booking pop-up. This route only catches visitors whose scripts are off. */
export default function BookACallPage() {
  redirect("/contact");
}
