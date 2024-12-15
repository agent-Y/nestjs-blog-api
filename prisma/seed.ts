import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// 既存データを削除
	await prisma.like.deleteMany({});
	await prisma.comment.deleteMany({});
	await prisma.post.deleteMany({});
	await prisma.user.deleteMany({});

	// 初期データを挿入
	const user1 = await prisma.user.create({
		data: {
			email: "unique_user1@example.com",
			password: "password1",
			username: "unique_user1",
			nickname: "User One",
		},
	});

	const user2 = await prisma.user.create({
		data: {
			email: "unique_user2@example.com",
			password: "password2",
			username: "unique_user2",
			nickname: "User Two",
		},
	});

	const user3 = await prisma.user.create({
		data: {
			email: "unique_user3@example.com",
			password: "password3",
			username: "unique_user3",
			nickname: "User Three",
		},
	});

	const post1 = await prisma.post.create({
		data: {
			title: "First Post",
			content: "This is the first post content",
			authorId: user1.id,
			comments: {
				create: [
					{
						content: "First comment on first post",
						authorId: user2.id,
					},
					{
						content: "Second comment on first post",
						authorId: user2.id,
					},
				],
			},
			likes: {
				create: [
					{
						userId: user2.id,
					},
					{
						userId: user3.id,
					},
				],
			},
		},
	});

	const post2 = await prisma.post.create({
		data: {
			title: "Second Post",
			content: "This is the second post content",
			authorId: user2.id,
			comments: {
				create: [
					{
						content: "First comment on second post",
						authorId: user1.id,
					},
					{
						content: "Second comment on second post",
						authorId: user3.id,
					},
				],
			},
			likes: {
				create: [
					{
						userId: user1.id,
					},
					{
						userId: user3.id,
					},
				],
			},
		},
	});

	const post3 = await prisma.post.create({
		data: {
			title: "Third Post",
			content: "This is the third post content",
			authorId: user1.id,
			comments: {
				create: [
					{
						content: "First comment on third post",
						authorId: user3.id,
					},
				],
			},
			likes: {
				create: [
					{
						userId: user2.id,
					},
				],
			},
		},
	});

	const post4 = await prisma.post.create({
		data: {
			title: "Fourth Post",
			content: "This is the fourth post content",
			authorId: user3.id,
			comments: {
				create: [
					{
						content: "First comment on fourth post",
						authorId: user1.id,
					},
				],
			},
			likes: {
				create: [
					{
						userId: user1.id,
					},
					{
						userId: user2.id,
					},
				],
			},
		},
	});

	console.log({ user1, user2, user3, post1, post2, post3, post4 });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
