import { blogs, type BlogData } from "../constants/blogData"; // Adjust path if needed
import { ArrowUpRight } from "lucide-react"; // Ensure you have lucide-react installed

const Blog = () => {
    return (
        <section id="blog" className="py-20 bg-black text-white relative">
            {/* Background Grid Effect (Optional) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    <span className="text-red-600">/</span> Latest_Insights
                </h2>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0 scrollbar-hide">
                    {blogs.map((blog: BlogData) => (
                        <a
                            key={blog.id}
                            href={blog.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block min-w-[280px] w-[85vw] md:w-auto snap-center flex-shrink-0 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                        >
                            {/* Image Container */}
                            <div className="h-40 md:h-48 overflow-hidden relative">
                                <img
                                    src={blog.image.startsWith('http') ? blog.image : `/${blog.image.replace(/^\//, '')}`}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-mono border border-zinc-700 text-red-400">
                                    {blog.readTime}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 md:p-6">
                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {blog.tags.map((tag: string, i: number) => (
                                        <span key={i} className="text-xs text-zinc-400 font-mono bg-zinc-800 px-2 py-1 rounded">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                                    {blog.title}
                                </h3>

                                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                                    {blog.desc}
                                </p>

                                <div className="flex justify-between items-center mt-4 border-t border-zinc-800 pt-4">
                                    <span className="text-xs text-zinc-500 font-mono">{blog.date}</span>
                                    <ArrowUpRight className="w-5 h-5 text-red-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* 'View All' Button */}
                <div className="mt-12 text-center">
                    <a href="https://medium.com/@piyushdubeydemo" target="_blank" className="inline-flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors font-mono">
                        [View_All_Articles] <ArrowUpRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Blog;
