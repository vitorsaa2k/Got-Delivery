import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./providers";
import { Footer } from "@/components/footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Got Delivery",
	description:
		"Cansado de anotar suas entregas no papel? Acesse suas entregas em qualquer lugar e obtenha resumos diários.",
	openGraph: {
		type: "website",
		url: `${process.env.PROD_URL}`,
		description:
			"Cansado de anotar suas entregas no papel? Acesse suas entregas em qualquer lugar e obtenha resumos diários.",
		images: [
			{
				url: "https://cdn.discordapp.com/attachments/1393658899311366304/1394626805096255601/image.png?ex=68777eed&is=68762d6d&hm=5334a1e081a543b53db5d9a36caab1cfe67e4b12101faad2124e42a34aa2903b&",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<meta
				name="google-site-verification"
				content="4dDZzjSXW4Uvd0_Fdjry_wqWaVwfx-HXd5xUt064e_I"
			/>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					{children}
					<Footer />
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
