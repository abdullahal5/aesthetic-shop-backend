import os from 'os';

export interface SystemHealth {
  success: boolean;
  status: string;
  uptime: {
    process: number;
    system: number;
    formatted: string;
  };
  cpu: {
    usage: number;
    cores: number;
    model: string;
    speed: number;
    loadAverage: number[];
  };
  memory: {
    total: number;
    free: number;
    used: number;
    usagePercentage: number;
    formatted: {
      total: string;
      free: string;
      used: string;
    };
  };
  process: {
    memoryUsage: {
      rss: string;
      heapTotal: string;
      heapUsed: string;
      external: string;
    };
    cpuUsage: number;
    pid: number;
    nodeVersion: string;
    platform: string;
    arch: string;
  };
  timestamp: string;
}

export class SystemHealthService {
  static getSystemHealth(): SystemHealth {
    // Safe OS calls with type assertions and fallbacks
    const cpus = (os.cpus() as os.CpuInfo[]) || [];
    const totalMem = (os.totalmem() as number) || 0;
    const freeMem = (os.freemem() as number) || 0;
    const usedMem = totalMem - freeMem;
    const loadAverage = (os.loadavg() as number[]) || [0, 0, 0];
    const cpuCount = cpus.length || 1;

    // Safe array access with fallback
    const loadAvg0 = loadAverage[0] !== undefined ? loadAverage[0] : 0;

    // Safe CPU usage calculation
    const cpuUsage = cpuCount > 0 ? (loadAvg0 / cpuCount) * 100 : 0;

    const processMemory = process.memoryUsage();

    const formatBytes = (bytes: number): string => {
      if (bytes === 0) return '0 B';
      if (!bytes || isNaN(bytes)) return '0 B';

      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      const size = Math.min(i, sizes.length - 1);
      const formattedValue =
        Math.round((bytes / Math.pow(1024, size)) * 100) / 100;
      return `${formattedValue} ${sizes[size]}`;
    };

    const formatUptime = (seconds: number): string => {
      if (!seconds || isNaN(seconds)) return '0d 0h 0m 0s';

      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      return `${days}d ${hours}h ${minutes}m ${secs}s`;
    };

    // Safe uptime values
    const processUptime = process.uptime() || 0;
    const systemUptime = os.uptime() || 0;

    // Safe CPU info
    const firstCpu = cpus[0];
    const cpuModel = firstCpu && firstCpu.model ? firstCpu.model : 'Unknown';
    const cpuSpeed = firstCpu && firstCpu.speed ? firstCpu.speed : 0;

    // Safe memory calculation
    const memoryUsagePercentage =
      totalMem > 0 ? Math.round((usedMem / totalMem) * 100) : 0;

    // Safe process CPU usage
    const processCpuUsage = process.cpuUsage();
    const processCpuUsageValue =
      processCpuUsage && processCpuUsage.user
        ? Math.round(processCpuUsage.user / 1000000)
        : 0;

    return {
      success: true,
      status: 'healthy',
      uptime: {
        process: processUptime,
        system: systemUptime,
        formatted: formatUptime(processUptime),
      },
      cpu: {
        usage: Math.min(100, Math.max(0, Math.round(cpuUsage))),
        cores: cpuCount,
        model: cpuModel,
        speed: cpuSpeed,
        loadAverage: loadAverage,
      },
      memory: {
        total: totalMem,
        free: freeMem,
        used: usedMem,
        usagePercentage: memoryUsagePercentage,
        formatted: {
          total: formatBytes(totalMem),
          free: formatBytes(freeMem),
          used: formatBytes(usedMem),
        },
      },
      process: {
        memoryUsage: {
          rss: formatBytes(processMemory.rss),
          heapTotal: formatBytes(processMemory.heapTotal),
          heapUsed: formatBytes(processMemory.heapUsed),
          external: formatBytes(processMemory.external),
        },
        cpuUsage: processCpuUsageValue,
        pid: process.pid || 0,
        nodeVersion: process.version || 'unknown',
        platform: process.platform || 'unknown',
        arch: process.arch || 'unknown',
      },
      timestamp: new Date().toLocaleString(),
    };
  }
}
