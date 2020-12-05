export class DashboardType {
    static readonly WEIGHT = new DashboardType('Weight', 'weight', 'weight', 'weight');
    static readonly BODYFAT = new DashboardType('Bodyfat', 'bodyfat', 'bodyfat', 'bodyfat');
    static readonly SQUAT_1RM = new DashboardType('Squat', 'squat', '1rm/squat', 'oneRepMax');
    static readonly BENCHPRESS_1RM = new DashboardType('Benchpress', 'benchpress', '1rm/benchpress', 'oneRepMax');
    static readonly DEADLIFT_1RM = new DashboardType('Deadlift', 'deadlift', '1rm/deadlift', 'oneRepMax');

    constructor(
        public readonly name: string,
        public readonly dbUrl: string,
        public readonly routeUrl: string,
        public readonly dbPropertyName: string,
    ) {}
}
