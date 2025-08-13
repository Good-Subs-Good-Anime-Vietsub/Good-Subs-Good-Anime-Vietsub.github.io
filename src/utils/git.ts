import simpleGit from 'simple-git';

export interface CommitDates {
  created: Date;
  updated: Date;
}

// Hàm lấy ngày commit đầu tiên và cuối cùng của một file từ Git
export async function getCommitDates(filePath: string): Promise<CommitDates> {
  try {
    const git = simpleGit(process.cwd());
    // Lấy toàn bộ lịch sử commit cho file, sắp xếp từ cũ nhất đến mới nhất
    const logs = await git.log({ file: filePath, '--reverse': null });

    if (logs.total > 0) {
      const firstCommit = logs.all[0];
      const lastCommit = logs.all[logs.all.length - 1];
      return {
        created: new Date(firstCommit.date),
        updated: new Date(lastCommit.date),
      };
    }
    throw new Error('No commit history found.');
  } catch (error: any) {
    console.warn(`[Thông tin] Không thể lấy ngày commit cho "${filePath}". Sử dụng ngày hiện tại để hiển thị tạm thời. Chi tiết: ${error.message}`);
    const now = new Date();
    return {
      created: now,
      updated: now,
    };
  }
}
