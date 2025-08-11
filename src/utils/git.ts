import simpleGit from 'simple-git';

// Hàm lấy ngày commit đầu tiên của một file từ Git
export async function getFirstCommitDate(filePath: string): Promise<Date> {
  try {
    const git = simpleGit(process.cwd()); // Specify current working directory
    const logs = await git.log({ file: filePath, maxCount: 1 });
    const firstCommit = logs.latest;
    if (firstCommit) {
      return new Date(firstCommit.date);
    }
    throw new Error('No commit history found.');
  } catch (error: any) { // Explicitly type error as any
    console.warn(`[Thông tin] Không thể lấy ngày commit cho "${filePath}". Sử dụng ngày hiện tại để hiển thị tạm thời. Chi tiết: ${error.message}`);
    return new Date();
  }
}
