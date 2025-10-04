import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Posts() {
    const posts = await prisma.post.findMany({
        include: {
            author: true
        }
    })
    async function deletePost(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await prisma.post.delete({ where: { id: parseInt(id) } });
        revalidatePath("/posts");
        redirect("/posts");
      }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Posts
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
      {posts.map(post => (
        <li key={post.id} className="flex items-center justify-between">
            <div>
              <Link href={`/posts/${post.id}`} className="font-semibold">{post.title}</Link>
              <span className="text-sm text-gray-600 ml-2">
                by {post.author.name}
              </span>
            </div>
            <Form action={deletePost}>
                <input type="hidden" name="id" value={post.id} />
                <button type="submit" className="text-red-500 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition-colors">
                  Delete
                </button>
            </Form>
        </li>
      ))}
      </ul>
      <Link href="/posts/new" className="text-blue-500 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition-colors">Create Post</Link>
    </div>
  );
}