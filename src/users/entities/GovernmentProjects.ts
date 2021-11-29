import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("government_projects", { schema: "bom" })
export class GovernmentProjects {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "아이디" })
  id: number;

  @Column("enum", {
    name: "is_category_energy",
    comment: "대상분야 에너지",
    enum: ["Y", "N"],
    default: () => "'N'",
  })
  isCategoryEnergy: "Y" | "N";

  @Column("enum", {
    name: "is_category_GHGs",
    comment: "대상분야 온실가스",
    enum: ["Y", "N"],
    default: () => "'N'",
  })
  isCategoryGhGs: "Y" | "N";

  @Column("enum", {
    name: "is_category_enviroment",
    comment: "대상분야 환경(폐기물)",
    enum: ["Y", "N"],
    default: () => "'N'",
  })
  isCategoryEnviroment: "Y" | "N";

  @Column("enum", {
    name: "is_category_chemistry",
    comment: "대상분야 화학물질",
    enum: ["Y", "N"],
    default: () => "'N'",
  })
  isCategoryChemistry: "Y" | "N";

  @Column("varchar", { name: "agency", comment: "지원기관", length: 50 })
  agency: string;

  @Column("varchar", {
    name: "project_name",
    comment: "지원사업명",
    length: 50,
  })
  projectName: string;

  @Column("varchar", { name: "purpose", comment: "목적", length: 50 })
  purpose: string;

  @Column("varchar", {
    name: "project_target",
    comment: "지원대상",
    length: 50,
  })
  projectTarget: string;

  @Column("double", {
    name: "budget",
    comment: "지원예산",
    precision: 22,
    default: () => "'0'",
  })
  budget: number;

  @Column("varchar", { name: "project_scale", comment: "지원규모", length: 50 })
  projectScale: string;

  @Column("varchar", { name: "description", comment: "사업내용", length: 255 })
  description: string;

  @Column("varchar", { name: "apply_period", comment: "신청기간", length: 50 })
  applyPeriod: string;

  @Column("varchar", { name: "apply_way", comment: "신청방법", length: 50 })
  applyWay: string;

  @Column("varchar", {
    name: "submit_document",
    comment: "제출서류",
    length: 50,
  })
  submitDocument: string;

  @Column("varchar", {
    name: "project_period",
    comment: "사업기간",
    length: 50,
  })
  projectPeriod: string;

  @Column("varchar", {
    name: "process_criteria",
    comment: "선정절차 및 기준",
    length: 50,
  })
  processCriteria: string;

  @Column("varchar", { name: "remark", comment: "비고", length: 50 })
  remark: string;

  @Column("varchar", { name: "file_uri", comment: "공고문 링크", length: 50 })
  fileUri: string;
}
