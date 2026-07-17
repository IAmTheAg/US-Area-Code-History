// The original US area codes: the 77 assigned to US states + DC in the
// October 1947 numbering plan, plus Alaska's 907 and Hawaii's 808 (1957) —
// included because they are the first and only codes their states ever had,
// which is what "still on an original code" means for this project.
export const ORIGINAL_CODES: Set<string> = new Set([
  // 1947 plan
  '201', '202', '203', '205', '206', '207', '208',
  '212', '213', '214', '215', '216', '217', '218',
  '301', '302', '303', '304', '305', '307',
  '312', '313', '314', '315', '316', '317', '319',
  '401', '402', '404', '405', '406', '412', '413', '414', '415', '419',
  '501', '502', '503', '504', '505', '512', '513', '515', '517', '518',
  '601', '602', '603', '605', '612', '614', '616', '617', '618',
  '701', '702', '703', '704', '712', '713', '715', '716', '717',
  '801', '802', '803', '812', '814', '815', '816',
  '901', '913', '914', '915', '916',
  // first codes of the 1957 additions
  '808', '907',
]);
