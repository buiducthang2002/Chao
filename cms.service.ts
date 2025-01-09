import { AdminUsersService } from '@/modules/resources/admin-users/admin-users.service';
import { AmbassadorsService } from '@/modules/resources/ambassadors/ambassadors.service';
import { CampaignService } from '@/modules/resources/campaigns/campaigns.service';
import { CountryService } from '@/modules/resources/countries/countries.service';
import { ExpConfigService } from '@/modules/resources/exp-configs/exp-configs.service';
import { InitTaskService } from '@/modules/resources/init-tasks/init-tasks.service';
import { LevelConfigService } from '@/modules/resources/level-configs/level-configs.service';
import { NetworkService } from '@/modules/resources/networks/networks.service';
import { ReferrerCommissionService } from '@/modules/resources/referrer-commissions/referrer-commissions.service';
import { ReferrerTypeService } from '@/modules/resources/referrer-types/referrer-types.service';
import { SettingService } from '@/modules/resources/settings/settings.service';
import { SponsorConfigService } from '@/modules/resources/sponsor-configs/sponsor-configs.service';
import { TaskService } from '@/modules/resources/tasks/tasks.service';
import { TokenService } from '@/modules/resources/tokens/tokens.service';
import { UpgradePackageService } from '@/modules/resources/upgrade-packages/upgrade-packages.service';
import { UserService } from '@/modules/resources/users/users.service';
import { UserWalletService } from '@/modules/resources/user-wallets/user-wallets.service';
import { UserLevelService } from '@/modules/resources/user-levels/user-levels.service';
import { ClaimTransactionService } from '@/modules/resources/claim-transactions/claim-transactions.service';
import { ClaimTaskTransactionService } from '@/modules/resources/claim-task-transactions/claim-task-transactions.service';
import { UpgradeTransactionService } from '@/modules/resources/upgrade-transactions/upgrade-transactions.service';
import { ReferrerRewardTransactionService } from '@/modules/resources/referrer-reward-transactions/referrer-reward-transactions.service';
import { ExpHistoryService } from '@/modules/resources/exp-histories/exp-histories.service';
import { UpgradeRequestService } from '@/modules/resources/upgrade-requests/upgrade-requests.service';
import { ClaimRequestService } from '@/modules/resources/claim-requests/claim-requests.service';
import { ClaimTaskRequestService } from '@/modules/resources/claim-task-requests/claim-task-requests.service';
import { ContractsService } from '@/modules/resources/contracts/contracts.service';
import { AdminRoleService } from '@/modules/resources/admin-roles/admin-roles.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  UpdateSettingDto,
  CreateNetworkDto,
  UpdateNetworkDto,
  CreateCountryDto,
  UpdateCountryDto,
  CreateExpConfigDto,
  UpdateExpConfigDto,
  CreateLevelConfigDto,
  UpdateLevelConfigDto,
  CreateTokenDto,
  UpdateTokenDto,
  CreateUpgradePackageDto,
  UpdateUpgradePackageDto,
  CreateInitTaskDto,
  UpdateInitTaskDto,
  CreateReferrerCommissionDto,
  UpdateReferrerCommissionDto,
  CreateReferrerTypeDto,
  UpdateReferrerTypeDto,
  CreateSponsorConfigDto,
  UpdateSponsorConfigDto,
  GetTasksDto,
  CreateAmbasaadorDto,
  CreateCampaignDto,
  UpdateCampaignDto,
  UpdateAmbassadorDto,
  GetListNetworkDto,
  GetListCountryDto,
  GetExpConfigDto,
  GetLevelConfigDto,
  GetTokenDto,
  GetUpgradePackageDto,
  GetInitTaskDto,
  GetReferrerCommissionDto,
  GetReferrerTypeDto,
  GetSponsorConfigDto,
  GetAmbassadorDto,
  GetCampaignsDto,
  GetUserDto,
  GetClaimTransactionsCmsDto,
  GetClaimTaskTransactionsCmsDto,
  GetUpgradeTransactionsCmsDto,
  UpdateUserLevelDto,
  GetUserLevelDto,
  GetReferralRewardTransactionsCmsDto,
  GetExpHistoryDto,
  GetUpgradeRequestCmsDto,
  GetClaimRequestCmsDto,
  UpdateUserStatusDto,
  CreateTaskDto,
  UpdateTaskDto,
  GetClaimTaskRequestCmsDto,
  CreateContractDto,
  GetContractDto,
  UpdateContractDto,
  UpdateRewardTypeDto,
  GetRewardTypeDto,
  CreateRewardTypeDto,
  GetAdminUsersDto,
  CreateAdminUsersDto,
  UpdateAdminUsersDto,
  GetCmsLogsDto,
  UploadImageDto,
  CreateCmsRoleRefPermissionDto,
  UpdateCmsRoleRefPermissionDto,
  GetCmsRoleRefPermissionDto,
  CreateCmsPermissionDto,
  GetCmsPermissionDto,
  UpdateCmsPermissionDto,
  CreateChatAirdropDto,
  UpdateChatAirdropDto,
  GetChatAirdropTransactionsCmsDto,
  CreateUserTaskDto,
  UpdateUserTaskDto,
  GetUserTasksCmsDto,
  GetExecuteTransactionsCmsDto,
  GetReferrerTreeDto,
  GetSponsorLogsDto,
  GetUserMiningDto,
  GetUserSponsorshipsDto,
  GetUserWalletsDto,
  ChangeAdminPasswordDto,
  MessageFormat,
  DateRangeDto,
  GetUserUpgradesDto,
  GetPincodeFailuresDto,
  GetUserConfigDto,
  GetUserTokensDto,
  UpdateAdminUsersCmsDto,
  GetLevelStatsDto,
  GetDashboardReferralDto,
  GetUserTasksStatsDto,
} from './dto/request.dto';
import { RewardTypeService } from '@/modules/resources/reward-type/reward-type.service';
import { UserMiningService } from '@/modules/resources/user-minings/user-minings.service';
import { ethers } from 'ethers';
import { UpgradeType } from '@/common/const/claim-and-upgrade.const';
import { CmsLogsService } from '@/helpers/cms-logs/cms-logs.service';
import { ImageService } from '@/modules/resources/images/images.service';
import { REWARD_TYPE } from '@/common/const/task.const';
import { CmsRoleRefPermissionService } from '@/modules/resources/cms-role-ref-permissions/cms-role-ref-permission.service';
import { CmsPermissionService } from '@/modules/resources/cms-permissions/cms-permissions.service';
import { ChatAirdropService } from '@/modules/resources/chat-airdrops/chat-airdrop.service';
import { ChatAirdropTransactionService } from '@/modules/resources/chat-airdrop-transactions/chat-airdrop-transactions.service';
import { TelegramWebHookService } from '../telegram-webhook/telegram-webhook.service';
import { ADMIN_ROLE } from '@/common/const/admin-role';
import { UserTaskService } from '@/modules/resources/user-tasks/user-tasks.service';
import { ExecuteTransactionService } from '@/modules/resources/execute-transactions/execute-transactions.service';
import { ReferrerService } from '@/modules/resources/referrers/referrers.service';
import { SponsorLogService } from '@/modules/resources/sponsor-logs/sponsor-logs.service';
import { UserSponsorshipService } from '@/modules/resources/user-sponsorships/user-sponsorships.service';
import { CMS_SEND_MESSAGE_TARGET } from '@/common/const/cms.const';
import { BullMqService } from '@/modules/adapters/bullmq/bullmq.service';
import { QUEUE_CMS_SEND_MESSAGE } from '@/common/const/bullmq.const';
import { CmsSendMessageService } from '@/modules/resources/cms-send-message/cms-send-message.service';
import { UserUpgradeService } from '@/modules/resources/user-upgrades/user-upgrades.service';
import { GetListSendMessagesDto } from '@/modules/resources/cms-send-message/dto/request.dto';
import { PinCodeFailuresService } from '@/modules/resources/pin-code-failures/pin-code-failures.service';
import { UserConfigService } from '@/modules/resources/user-configs/user-configs.service';
import { UserTokenService } from '@/modules/resources/user-tokens/user-tokens.service';
import { RESOURCES } from '@/common/const/permission.enum';
import { find, uniq } from 'lodash';
import { GetListSendMessagesFailedDto } from '@/modules/resources/send-message-failed/dto/request.dto';
import { SendMessageFailedService } from '@/modules/resources/send-message-failed/send-message-failed.service';
import { ScanLogConfigService } from '@/modules/resources/scan-log-config/scan-log-config.service';
import {
  CreateScanLogConfigDto,
  UpdateScanLogConfigDto,
} from '@/modules/resources/scan-log-config/dto/request.dto';
import { PaginationQueriesDto } from '@/common/dto/pagination.dto';
import { DashboardRefTypeEnum } from '@/common/const/dashboard.const';
import { ClientService } from '@/modules/resources/clients/clients.service';
import { ClientRoleService } from '@/modules/resources/client-roles/client-roles.service';
import { ClientPermissionService } from '@/modules/resources/client-permissions/client-permissions.service';
import {
  CreateClientDto,
  UpdateClientDto,
} from '@/modules/resources/clients/dto/request.dto';
import {
  CreateClientRoleDto,
  UpdateClientRoleDto,
} from '@/modules/resources/client-roles/dto/request.dto';
import {
  CreateClientPermissionDto,
  UpdateClientPermissionDto,
} from '@/modules/resources/client-permissions/dto/request.dto';
import { UserWallet } from '@/modules/resources/user-wallets/user-wallets.interface';

@Injectable()
export class CmsService {
  [x: string]: any;
  constructor(
    private readonly networkService: NetworkService,
    private readonly taskService: TaskService,
    private readonly countryService: CountryService,
    private readonly expConfigService: ExpConfigService,
    private readonly levelConfigService: LevelConfigService,
    private readonly tokenService: TokenService,
    private readonly upgradePackageService: UpgradePackageService,
    private readonly initTaskService: InitTaskService,
    private readonly referrerCommissionService: ReferrerCommissionService,
    private readonly referrerTypeService: ReferrerTypeService,
    private readonly sponsorConfigService: SponsorConfigService,
    private readonly settingService: SettingService,
    private readonly adminService: AdminUsersService,
    private readonly ambassadorService: AmbassadorsService,
    private readonly campaignService: CampaignService,
    private readonly userService: UserService,
    private readonly userWalletService: UserWalletService,
    private readonly userLevelService: UserLevelService,
    private readonly claimTransactionService: ClaimTransactionService,
    private readonly claimTaskTransactionService: ClaimTaskTransactionService,
    private readonly referrerRewardTransactionService: ReferrerRewardTransactionService,
    private readonly upgradeTransactionService: UpgradeTransactionService,
    private readonly expHistoryService: ExpHistoryService,
    private readonly upgradeRequestService: UpgradeRequestService,
    private readonly claimRequestService: ClaimRequestService,
    private readonly claimTaskRequestService: ClaimTaskRequestService,
    private readonly rewardTypeService: RewardTypeService,
    private readonly contractsService: ContractsService,
    private readonly adminRoleService: AdminRoleService,
    private readonly userMiningService: UserMiningService,
    private readonly cmsLogsService: CmsLogsService,
    private readonly imageService: ImageService,
    private readonly cmsRoleRefPermissionService: CmsRoleRefPermissionService,
    private readonly cmsPermissionService: CmsPermissionService,
    private readonly chatAirdropService: ChatAirdropService,
    private readonly chatAirdropTransactionService: ChatAirdropTransactionService,
    private readonly telegramWebHookService: TelegramWebHookService,
    private readonly userTaskService: UserTaskService,
    private readonly executeTransactionService: ExecuteTransactionService,
    private readonly referrerService: ReferrerService,
    private readonly sponsorLogService: SponsorLogService,
    private readonly userSponsorshipService: UserSponsorshipService,
    private readonly bullMqService: BullMqService,
    private readonly cmsSendMessageService: CmsSendMessageService,
    private readonly userUpgradeService: UserUpgradeService,
    private readonly pincodeFailuresService: PinCodeFailuresService,
    private readonly userConfigService: UserConfigService,
    private readonly userTokenService: UserTokenService,
    private readonly sendMessageFailedService: SendMessageFailedService,
    private readonly scanLogConfigService: ScanLogConfigService,
    private readonly clientService: ClientService,
    private readonly clientRoleService: ClientRoleService,
    private readonly clientPermissionService: ClientPermissionService,
  ) {}

  //ADMIN
  async createAdminUser(createAdminUsersDto: CreateAdminUsersDto) {
    return this.adminService.createAdminUsers(createAdminUsersDto);
  }

  async getAdminUsers(getAdminUsersDto: GetAdminUsersDto) {
    return this.adminService.getAdminUsersCms(getAdminUsersDto);
  }

  async getAdminProfile(adminId: string) {
    return this.adminService.getProfile(adminId);
  }

  async getAdminDetail(adminId: string) {
    const admin: any = await this.adminService.getProfile(adminId);
    const role: any = await this.adminRoleService.getRoleById(admin.role._id);

    const permissions: any =
      role.roleKey === ADMIN_ROLE.ROOT
        ? await this.cmsPermissionService.getAllPermissions()
        : await this.cmsRoleRefPermissionService.getPermissionByRole(role);

    const groupedPermissions = permissions.reduce((result, item) => {
      const permission = item.key || item.permission?.key;
      const tableName = permission.split('-').slice(1).join(' ');

      if (!result[tableName]) {
        result[tableName] = [];
      }

      result[tableName].push(permission);
      return result;
    }, {});

    const formattedData = Object.keys(groupedPermissions).map((tableName) => ({
      name: tableName,
      key: groupedPermissions[tableName],
    }));

    return {
      ...admin,
      permissions: formattedData,
    };
  }

  async getAdminRoles() {
    const roles = await this.adminRoleService.getAdminRolesCms();

    const rolesWithPermissionsAndCount = await Promise.all(
      roles.map(async (role) => {
        const [permissions, adminCount] = await Promise.all([
          this.cmsRoleRefPermissionService.getPermissionByRole(
            role._id as string,
          ),
          this.adminService.countAdminsByRole(role._id as string),
        ]);

        return {
          ...role,
          adminCount,
          permissions,
        };
      }),
    );

    return rolesWithPermissionsAndCount;
  }
  async updateAdminUser(
    adminId: string,
    updateAdminUsersDto: UpdateAdminUsersDto,
  ) {
    return this.adminService.updateAdminUser(adminId, updateAdminUsersDto);
  }

  async updateAdminUserProfile(
    adminId: string,
    updateAdminUsersCmsDto: UpdateAdminUsersCmsDto,
  ) {
    return this.adminService.updateAdminUserCms(
      adminId,
      updateAdminUsersCmsDto,
    );
  }

  async changeAdminUserPass(
    adminId: string,
    changeAdminPasswordData: ChangeAdminPasswordDto,
  ) {
    return this.adminService.changePassword(adminId, changeAdminPasswordData);
  }

  async deleteAdminUser(adminId: string) {
    return this.adminService.deleteAdminUser(adminId);
  }

  async getRoleById(adminId: string) {
    return this.adminRoleService.getRoleById(adminId);
  }

  //ROLE-PERMISSION
  async createCmsRoleRefPermission(
    createCmsRoleRefPermissionsDto: CreateCmsRoleRefPermissionDto,
  ) {
    return this.cmsRoleRefPermissionService.createCmsRoleRefPermission(
      createCmsRoleRefPermissionsDto,
    );
  }

  async getCmsRoleRefPermissions(
    getCmsRoleRefPermissionsData: GetCmsRoleRefPermissionDto,
  ) {
    return this.cmsRoleRefPermissionService.getCmsRoleRefPermissionsCms(
      getCmsRoleRefPermissionsData,
    );
  }

  async getCmsRoleRefPermissionByAdmin(roleId: string) {
    const role: any = await this.adminRoleService.getRoleById(roleId);

    const permissions =
      role.roleKey === ADMIN_ROLE.ROOT
        ? await this.cmsPermissionService.getAllPermissions()
        : await this.cmsRoleRefPermissionService.getPermissionByRole(role);

    return {
      role: role.name,
      permissions: permissions.map((item) => item.key || item.permission?.key),
    };
  }

  async updateCmsRoleRefPermission(
    roleId: string,
    updateCmsRoleRefPermissionsDto: UpdateCmsRoleRefPermissionDto,
  ) {
    return this.cmsRoleRefPermissionService.updateCmsRoleRefPermission(
      roleId,
      updateCmsRoleRefPermissionsDto,
    );
  }
  async deleteCmsRoleRefPermission(adminId: string) {
    return this.cmsRoleRefPermissionService.deleteCmsRoleRefPermission(adminId);
  }

  //CMS-PERMISSION
  async createCmsPermission(createCmsPermissionsDto: CreateCmsPermissionDto) {
    return this.cmsPermissionService.createCmsPermission(
      createCmsPermissionsDto,
    );
  }

  async getCmsPermissions(getCmsPermissionsData: GetCmsPermissionDto) {
    const permissions: any =
      await this.cmsPermissionService.getCmsPermissionsCms(
        getCmsPermissionsData,
      );

    const groupedPermissions = permissions.data.reduce((result, item) => {
      const tableName = item.title.split(' ').slice(1).join(' ');

      if (!result[tableName]) {
        result[tableName] = [];
      }

      result[tableName].push(item.key);
      return result;
    }, {});

    let tableNames = Object.keys(groupedPermissions);

    if (getCmsPermissionsData.search) {
      const searchTerm = getCmsPermissionsData.search.toLowerCase();
      tableNames = tableNames.filter((tableName) =>
        tableName.toLowerCase().includes(searchTerm),
      );
    }

    const paginatedTableNames = tableNames.slice(
      getCmsPermissionsData.offset,
      getCmsPermissionsData.offset + getCmsPermissionsData.limit,
    );

    const formattedData = paginatedTableNames.map((tableName) => ({
      name: tableName,
      key: groupedPermissions[tableName],
    }));

    return {
      total: tableNames.length,
      limit: getCmsPermissionsData.limit,
      offset: getCmsPermissionsData.offset,
      data: formattedData,
    };
  }

  async getCmsPermissionById(id: string) {
    return this.cmsPermissionService.getPermissionById(id);
  }

  async updateCmsPermission(
    id: string,
    updateCmsPermissionsDto: UpdateCmsPermissionDto,
  ) {
    return this.cmsPermissionService.updateCmsPermission(
      id,
      updateCmsPermissionsDto,
    );
  }

  async deleteCmsPermission(adminId: string) {
    return this.cmsPermissionService.deleteCmsPermission(adminId);
  }

  //RESOURCES
  async getAllResources() {
    const resources = Object.values(RESOURCES);
    return resources;
  }

  //SETTINGS
  async getOrCreateSettings() {
    const settings = await this.settingService.getSetting();

    if (!settings) {
      return this.settingService.createSetting({
        isMaintenance: false,
        minClaim: 0,
        isPremiumRewardInit: 5,
      });
    }

    return settings;
  }

  async updateSettings(updateSettingDto: UpdateSettingDto) {
    return this.settingService.updateSetting(updateSettingDto);
  }

  //USER
  async getUsers(getUserDto: GetUserDto) {
    const userData = await this.userService.getUsersCms(getUserDto);

    const userIds = userData?.data.map((user) => user._id);

    const userWallets: UserWallet[] =
      await this.userWalletService.getMainWalletByUserIds(userIds as string[]);

    const formattedData = await Promise.all(
      userData.data.map(async (item) => {
        const userWallet = find(userWallets, { user: item._id }) as UserWallet;
        return {
          _id: item._id,
          username: item.username,
          firstName: item.firstName,
          lastName: item.lastName,
          telegramUid: item.telegramUid,
          refCode: item.refCode,
          isPremium: item.isPremium,
          status: item.status,
          wallet: userWallet?.aaAddress || null,
        };
      }),
    );

    return {
      total: userData.total,
      offset: userData.offset,
      limit: userData.limit,
      data: formattedData,
    };
  }

  async getUsersProfile(userId: string) {
    const userData = await this.userService.cmsGetUserByUserId(userId);
    const userWallet =
      await this.userWalletService.getMainWalletByUserId(userId);

    if (!userData) {
      throw new Error('User not found.');
    }

    const country = userData.country;
    const countryName =
      country && typeof country === 'object' && country !== null
        ? (country as { name: string }).name
        : null;

    const countryImage =
      country && typeof country === 'object' && country !== null
        ? (country as { image: string }).image
        : null;

    return {
      userId: userData._id,
      userName: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      isPremium: userData.isPremium,
      country: countryName,
      countryFlag: countryImage,
      joinedAt: userData.createdAt,
      refCode: userData.refCode,
      wallet: userWallet?.aaAddress || null,
      status: userData.status,
    };
  }

  async getUserReferralInfo(userId: string) {
    const userLevel = await this.userLevelService.getUserLevelByUserId(userId);
    const userReferrer = await this.userService.getRefferralInvited(userId);
    const refByData = await this.userService.getReferredBy(userId);
    const refCommission =
      await this.referrerCommissionService.getAllReferrerCommissions();

    const l1Commission =
      refCommission.find((commission) => commission.referrerLevel === 1)
        ?.commissionRate || 0;
    const l2Commission =
      refCommission.find((commission) => commission.referrerLevel === 2)
        ?.commissionRate || 0;

    return {
      xpLevel: userLevel.level,
      invitedBy: refByData?.username || refByData?.firstName || null,
      friendInvited: userReferrer.length,
      l1Commission: l1Commission,
      l2Commission: l2Commission,
    };
  }

  async getUserByUserId(userId: string) {
    return await this.userService.getUserByUserId(userId);
  }

  async updateUserStatus(userId: string, updateData: UpdateUserStatusDto) {
    return await this.userService.updateUserStatusCms(userId, updateData);
  }

  //TRANSACTION
  async getClaimTransactions(
    getClaimTransactionsDto: GetClaimTransactionsCmsDto,
    userId?: string,
  ) {
    const claimData =
      await this.claimTransactionService.getClaimTransactionsCms(
        getClaimTransactionsDto,
        userId,
      );

    const formattedData = await Promise.all(
      claimData.data.map(async (item: any) => {
        const chainName = await this.networkService.getNetworkByChainId(
          item.chainId,
        );

        return {
          _id: item._id,
          firstName: item.user.firstName,
          lastName: item.user.lastName,
          username: item.user.username,
          chainName: chainName.name,
          symbol: item.tokenId.symbol,
          amount: item.amount,
          chainId: item.chainId,
          payFeeOption: item.claimRequestId.payFeeOption,
          status: item.claimRequestId.status,
          transactionHash: item.transactionHash,
          createdAt: item.createdAt,
        };
      }),
    );

    return {
      total: claimData.total,
      offset: claimData.offset,
      limit: claimData.limit,
      data: formattedData,
    };
  }

  async getClaimTaskTransactions(
    getClaimTaskTransactions: GetClaimTaskTransactionsCmsDto,
    userId?: string,
  ) {
    const claimTaskData =
      await this.claimTaskTransactionService.getClaimTaskTransactionsCms(
        getClaimTaskTransactions,
        userId,
      );

    const formattedData = claimTaskData.data.map((item) => {
      return {
        _id: item._id,
        firstName: item.user?.firstName,
        lastName: item.user?.lastName,
        username: item.user?.username,
        amount: item.amount,
        symbol: item.tokenId.symbol,
        chainId: item.chainId,
        payFeeOption: item.claimTaskRequestId.payFeeOption,
        createdAt: item.createdAt,
        transactionHash: item.transactionHash,
        status: item.status,
      };
    });

    return {
      total: claimTaskData.total,
      offset: claimTaskData.offset,
      limit: claimTaskData.limit,
      data: formattedData,
    };
  }

  async getUpgradeTransactions(
    getUpgradeTransactionsDto: GetUpgradeTransactionsCmsDto,
    userId?: string,
  ) {
    const upgradeData =
      await this.upgradeTransactionService.getUpgradeTransactionsCms(
        getUpgradeTransactionsDto,
        userId,
      );

    const formattedData = upgradeData.data.map((item: any) => ({
      _id: item._id,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
      usernam: item.user.username,
      amount: item.amount,
      symbol: item.tokenId.symbol,
      chainId: item.chainId,
      requestId: item.upgradeRequestId._id,
      level: item.upgradeRequestId.level,
      upgradeType: item.upgradeRequestId.upgradeType,
      status: item.upgradeRequestId.status,
      payFeeOption: item.upgradeRequestId.payFeeOption,
      transactionHash: item.transactionHash,
      createdAt: item.createdAt,
    }));

    return {
      total: upgradeData.total,
      offset: upgradeData.offset,
      limit: upgradeData.limit,
      data: formattedData,
    };
  }

  async getReferralRewardTransactions(
    getReferralRewardTransactions: GetReferralRewardTransactionsCmsDto,
    userId?: string,
  ) {
    const referralData =
      await this.referrerRewardTransactionService.getReferralRewardTransactionsCms(
        getReferralRewardTransactions,
        userId,
      );

    const formattedData = await Promise.all(
      referralData.data.map(async (item: any) => {
        return {
          _id: item._id,
          firstName: item.user.firstName,
          lastName: item.user.lastName,
          username: item.user.username,
          from: {
            _id: item.fromUser._id,
            firstName: item.fromUser.firstName,
            lastName: item.fromUser.lastName,
            username: item.fromUser.username,
          },
          amount: item.amount,
          symbol: item.token.symbol,
          tokenLogo: item.token.logo,
          chainId: item.token.chainId,
          percentReferral: item.percentReferral,
          referralLevel: item.referralLevel,
          createdAt: item.createdAt,
          transactionHash: item.transactionHash,
        };
      }),
    );

    return {
      total: referralData.total,
      offset: referralData.offset,
      limit: referralData.limit,
      data: formattedData,
    };
  }

  async getChatAirdropTransactions(
    getChatAirdropTransactions: GetChatAirdropTransactionsCmsDto,
    userId?: string,
  ) {
    const chatAirdropData =
      await this.chatAirdropTransactionService.getChatAirdropTransactionsCms(
        getChatAirdropTransactions,
        userId,
      );

    const formattedData = await Promise.all(
      chatAirdropData.data.map(async (item: any) => {
        return {
          _id: item._id,
          chatId: item.msg.chat.id,
          amount: item.amount,
          symbol: item.token.symbol,
          tokenLogo: item.token.logo,
          chainId: item.token.chainId,
          status: item.status,
          createdAt: item.createdAt,
          transactionHash: item.transactionHash,
        };
      }),
    );

    return {
      total: chatAirdropData.total,
      offset: chatAirdropData.offset,
      limit: chatAirdropData.limit,
      data: formattedData,
    };
  }

  async getExecuteTransactions(
    getExecuteTransactionsCmsDto: GetExecuteTransactionsCmsDto,
    userId?: string,
  ) {
    const executeData =
      await this.executeTransactionService.getExecuteTransactionsCms(
        getExecuteTransactionsCmsDto,
        userId,
      );

    const formattedData = await Promise.all(
      executeData.data.map(async (item: any) => {
        return {
          _id: item._id,
          firstName: item.user.firstName,
          lastName: item.user.lastName,
          username: item.user.username,
          recipient: item.recipient,
          payFeeOption: item.payFeeOption,
          status: item.status,
          createdAt: item.createdAt,
          transactionHash: item.transactionHash,
        };
      }),
    );

    return {
      total: executeData.total,
      offset: executeData.offset,
      limit: executeData.limit,
      data: formattedData,
    };
  }

  async getUpgradeRequests(getUpgradeRequestsDto: GetUpgradeRequestCmsDto) {
    const upgradeData = await this.upgradeRequestService.getUpgradeRequestCms(
      getUpgradeRequestsDto,
    );
    const formattedData = upgradeData.data.map((item) => ({
      _id: item._id,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
      username: item.user.username,
      upgradeType: item.upgradeType,
      level: item.level,
      amount: item.amount,
      symbol: item.token.symbol,
      chainId: item.token.chainId,
      payFeeOption: item.payFeeOption,
      createdAt: item.createdAt,
      transactionHash: item.transactionHash,
      status: item.status,
    }));

    return {
      total: upgradeData.total,
      offset: upgradeData.offset,
      limit: upgradeData.limit,
      data: formattedData,
    };
  }

  //REQUEST
  async getClaimRequests(getClaimRequestsDto: GetClaimRequestCmsDto) {
    const claimData =
      await this.claimRequestService.getClaimRequestCms(getClaimRequestsDto);

    const formattedData = claimData.data.map((item) => ({
      _id: item._id,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
      username: item.user.username,
      amount: item.amount,
      symbol: item.token.symbol,
      chainId: item.token.chainId,
      payFeeOption: item.payFeeOption,
      createdAt: item.createdAt,
      transactionHash: item.transactionHash,
      status: item.status,
    }));

    return {
      total: claimData.total,
      offset: claimData.offset,
      limit: claimData.limit,
      data: formattedData,
    };
  }

  async getClaimTaskRequests(
    getClaimTaskRequestsDto: GetClaimTaskRequestCmsDto,
  ) {
    const claimTaskData =
      await this.claimTaskRequestService.getClaimTaskRequestCms(
        getClaimTaskRequestsDto,
      );

    const formattedData = claimTaskData.data.map((item) => {
      const amount = item.token
        ? `${item.amount} ${item.token.symbol}`
        : `${item.amount} Sponsor`;

      return {
        _id: item._id,
        firstName: item.user.firstName,
        lastName: item.user.lastName,
        username: item.user.username,
        amount: amount,
        symbol: item.token ? item.token.symbol : 'Sponsor',
        chainId: item.token
          ? item.token.chainId
          : item.rewardTypeDetail.chainId,
        payFeeOption: item.payFeeOption,
        createdAt: item.createdAt,
        transactionHash: item.transactionHash,
        status: item.status,
      };
    });

    return {
      total: claimTaskData.total,
      offset: claimTaskData.offset,
      limit: claimTaskData.limit,
      data: formattedData,
    };
  }

  //NETWORK
  async createNetwork(createNetwork: CreateNetworkDto) {
    return this.networkService.createNetworkCms(createNetwork);
  }

  async getNetworks(getNetwork: GetListNetworkDto) {
    const networkData =
      await this.networkService.getListNetworksCms(getNetwork);

    const formattedData = networkData.data.map((item) => ({
      _id: item._id,
      name: item.name,
      platform: item.platform,
      rpcUrl: item.rpcUrl,
      symbol: item.symbol,
      chainId: item.chainId,
      image: item.image,
      blockExplorer: item.blockExplorer,
      isSupported: item.isSupported,
    }));

    return {
      total: networkData.total,
      offset: networkData.offset,
      limit: networkData.limit,
      data: formattedData,
    };
  }

  async getNetworkById(id: string) {
    return this.networkService.getNetworkById(id);
  }

  async updateNetwork(id: string, updateNetwork: UpdateNetworkDto) {
    return this.networkService.updateNetworkCms(id, updateNetwork);
  }

  async deleteNetwork(id: string) {
    return this.networkService.deleteNetworkCms(id);
  }

  //TASK
  async createTask(createTask: CreateTaskDto) {
    const rewardType = await this.rewardTypeService.getRewardTypeById(
      createTask.rewardType,
    );
    if (
      rewardType.type === REWARD_TYPE.SPONSOR_TRANSACTION &&
      !Number.isInteger(createTask.rewardAmount)
    ) {
      throw new BadRequestException(
        'Reward sponsor amount must be an integer.',
      );
    }
    return this.taskService.createTaskCms(createTask);
  }

  async getTasks(getTaskData: GetTasksDto) {
    const taskData = await this.taskService.getTasksCms(getTaskData);

    const formattedData = taskData.data.map((item: any) => ({
      _id: item._id,
      title: item.title,
      campaign: item.campaign?.name,
      ambassador: item.ambassador?.name,
      ambassadorImage: item.ambassador?.images,
      jobType: item.jobType,
      link: item.metadata.url,
      rewardAmount: item.rewardAmount,
      requireTask: item.requireTask,
      rewardType: item.rewardType,
      requirePremium: item.requirePremium,
      order: item?.order,
    }));

    return {
      total: taskData.total,
      offset: taskData.offset,
      limit: taskData.limit,
      data: formattedData,
    };
  }

  async getTaskById(id: string) {
    const getTaskData: any = await this.taskService.cmsGetTaskById(id);

    return {
      images: getTaskData?.images || null,
      title: getTaskData?.title || null,
      type: getTaskData?.type || null,
      description: getTaskData?.description || null,
      jobType: getTaskData?.jobType || null,
      rewardType: getTaskData?.rewardType || null,
      rewardAmount: getTaskData?.rewardAmount || null,
      rewardPremium: getTaskData?.rewardPremium || null,
      requireTask: getTaskData?.requireTask
        ? {
            ...getTaskData.requireTask,
            campaign: getTaskData.requireTask?.campaign?.name || null,
            ambassador: getTaskData.requireTask?.ambassador?.name || null,
          }
        : null,
      ambassador: getTaskData?.ambassador || null,
      campaign: getTaskData?.campaign || null,
      requirePremium: getTaskData?.requirePremium || null,
      metadata: getTaskData?.metadata || null,
      order: getTaskData?.order || null,
    };
  }

  async updateTask(id: string, updateTask: UpdateTaskDto) {
    const currentTask = await this.taskService.getTaskById(id);

    const newRewardType = updateTask.rewardType
      ? await this.rewardTypeService.getRewardTypeById(updateTask.rewardType)
      : await this.rewardTypeService.getRewardTypeById(currentTask.rewardType);

    if (
      newRewardType.type === REWARD_TYPE.SPONSOR_TRANSACTION &&
      (updateTask.rewardAmount !== undefined
        ? !Number.isInteger(updateTask.rewardAmount)
        : !Number.isInteger(currentTask.rewardAmount))
    ) {
      throw new BadRequestException(
        'Reward sponsor amount must be an integer.',
      );
    }

    return this.taskService.updateTaskCms(id, updateTask);
  }

  async deleteTask(id: string) {
    return this.taskService.deleteTaskCms(id);
  }

  //COUNTRY
  async createCountry(createCountry: CreateCountryDto) {
    return this.countryService.createCountryCms(createCountry);
  }

  async getCountries(getCountryData: GetListCountryDto) {
    const countryData =
      await this.countryService.getListCountriesCms(getCountryData);

    const formattedData = countryData.data.map((item) => ({
      _id: item._id,
      name: item.name,
      image: item.image,
      code: item.code,
    }));

    return {
      total: countryData.total,
      offset: countryData.offset,
      limit: countryData.limit,
      data: formattedData,
    };
  }

  async getCountryById(id: string) {
    return this.countryService.getCountryById(id);
  }

  async updateCountry(id: string, updateCountry: UpdateCountryDto) {
    return this.countryService.updateCountryCms(id, updateCountry);
  }
  async deleteCountry(id: string) {
    return this.countryService.deleteCountryCms(id);
  }

  //CONTRACT
  async createContract(createContract: CreateContractDto) {
    return this.contractsService.createContractCms(createContract);
  }

  async getContracts(getContractData: GetContractDto) {
    return this.contractsService.getContractsCms(getContractData);
  }

  async getContractById(id: string) {
    return this.contractsService.getContractById(id);
  }

  async updateContract(id: string, updateContract: UpdateContractDto) {
    return this.contractsService.updateContractCms(id, updateContract);
  }

  async deleteContract(id: string) {
    return this.contractsService.deleteContractCms(id);
  }

  //CHAT-AIRDROP
  async createChatAirdrop(createChatAirdrop: CreateChatAirdropDto) {
    return this.chatAirdropService.createChatAirdropCms(createChatAirdrop);
  }

  async getChatAirdrops() {
    return this.chatAirdropService.getAllChatAirdrops();
  }

  async getChatAirdropById(id: string) {
    return this.chatAirdropService.getChatAirdropById(id);
  }

  async updateChatAirdrop(id: string, updateChatAirdrop: UpdateChatAirdropDto) {
    await this.chatAirdropService.updateChatAirdropCms(id, updateChatAirdrop);

    return await this.telegramWebHookService.configChatAirdrop();
  }

  async deleteChatAirdrop(id: string) {
    return this.chatAirdropService.deleteChatAirdropCms(id);
  }

  //EXP-CONFIG
  async createExpConfig(createExpConfig: CreateExpConfigDto) {
    return this.expConfigService.createExpConfigCms(createExpConfig);
  }

  async getExpConfigs(getExpConfigData: GetExpConfigDto) {
    const result =
      await this.expConfigService.getAllExpConfigCms(getExpConfigData);

    return {
      total: result.total,
      offset: result.offset,
      limit: result.limit,
      data: result.data.map((item: any) => ({
        _id: item._id,
        action: item.action,
        experience: item.experience,
        description: item.description,
        date: item.createdAt,
      })),
    };
  }

  async getExpConfigById(id: string) {
    return this.expConfigService.getExpConfigById(id);
  }

  async updateExpConfig(id: string, updateExpConfig: UpdateExpConfigDto) {
    return this.expConfigService.updateExpConfigCms(id, updateExpConfig);
  }
  async deleteExpConfig(id: string) {
    return this.expConfigService.deleteExpConfigCms(id);
  }

  //EXP-HISTORY
  async getExpHistories(getExpHistoryData: GetExpHistoryDto) {
    const expData =
      await this.expHistoryService.getListExpHistoriesCms(getExpHistoryData);

    const formattedData = expData.data.map((item: any) => ({
      _id: item._id,
      username: item.userId?.username || null,
      firstName: item.user.firstName,
      lastName: item.user.lastName,
      referrerId: item.referrerId || null,
      amount: item.amount,
      action: item.action,
      createdAt: item.createdAt,
    }));

    return {
      total: expData.total,
      offset: expData.offset,
      limit: expData.limit,
      data: formattedData,
    };
  }

  //LEVEL-CONFIG
  async createLevelConfig(createLevelConfigData: CreateLevelConfigDto) {
    return this.levelConfigService.createLevelConfigCms(createLevelConfigData);
  }

  async getLevelConfigs(getLevelConfigData: GetLevelConfigDto) {
    const levelConfigData =
      await this.levelConfigService.getAllLevelConfigCms(getLevelConfigData);

    const formattedData = {
      total: levelConfigData.total,
      offset: levelConfigData.offset,
      limit: levelConfigData.limit,
      data: levelConfigData.data.map((item: any) => ({
        _id: item._id,
        level: item.level,
        experienceRequire: item.experienceRequire,
        ref1Commission: item.ref1Commission,
        ref2Commission: item.ref2Commission,
      })),
    };

    return formattedData;
  }

  async getLevelConfigById(id: string) {
    return this.levelConfigService.getLevelConfigById(id);
  }

  async updateLevelConfig(id: string, updateLevelConfig: UpdateLevelConfigDto) {
    return this.levelConfigService.updateLevelConfigCms(id, updateLevelConfig);
  }

  async deleteLevelConfig(id: string) {
    return this.levelConfigService.deleteLevelConfigCms(id);
  }

  //TOKENS
  async createToken(createTokenData: CreateTokenDto) {
    if (
      createTokenData.address === undefined ||
      createTokenData.address === null
    ) {
      throw new HttpException('Address is required.', HttpStatus.BAD_REQUEST);
    }

    if (createTokenData.address !== '') {
      const isValid = await this.networkService.validAddress(
        createTokenData.chainId,
        createTokenData.address,
      );

      if (!isValid) {
        throw new HttpException(
          'nvalid address provided.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return this.tokenService.createTokenCms(createTokenData);
  }

  async getTokens(getTokenConfigData: GetTokenDto) {
    const tokenData = await this.tokenService.getTokensCms(getTokenConfigData);

    const formattedData = await Promise.all(
      tokenData.data.map(async (item) => {
        const chainName = await this.networkService.getNetworkByChainId(
          item.chainId,
        );

        return {
          _id: item._id,
          name: item.name,
          symbol: item.symbol,
          chainName: chainName.name,
          chainId: item.chainId,
          address: item.address,
          logo: item.logo,
          decimals: item.decimals,
          order: item.order,
        };
      }),
    );

    return {
      total: tokenData.total,
      offset: tokenData.offset,
      limit: tokenData.limit,
      data: formattedData,
    };
  }

  async getTokenById(id: string) {
    const tokenData = await this.tokenService.getTokenById(id);
    const chainData = await this.networkService.getNetworkByChainId(
      tokenData.chainId,
    );

    return {
      _id: tokenData._id,
      name: tokenData.name,
      symbol: tokenData.symbol,
      address: tokenData.address,
      chainName: chainData.name,
      chainId: tokenData.chainId,
      chainKey: chainData.chainKey,
      platform: chainData.platform,
      logo: tokenData.logo,
      decimals: tokenData.decimals,
      isDefault: tokenData.isDefault,
      order: tokenData.order,
    };
  }

  async updateToken(id: string, updateToken: UpdateTokenDto) {
    const currentToken = await this.tokenService.getTokenById(id);
    const currentNetwork = await this.networkService.getNetworkByChainId(
      currentToken.chainId,
    );

    if (updateToken.chainId && updateToken.address) {
      const isValid = await this.networkService.validAddress(
        updateToken.chainId,
        updateToken.address,
      );

      if (!isValid) {
        throw new HttpException(
          'Invalid address provided.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (updateToken.chainId) {
      const network = await this.networkService.getNetworkByChainId(
        updateToken.chainId,
      );

      if (!network) {
        throw new HttpException('Network not found!', HttpStatus.NOT_FOUND);
      }
    }

    if (updateToken.address) {
      const network = await this.networkService.getNetworkByChainId(
        currentNetwork.chainId,
      );

      if (!network) {
        throw new HttpException(
          'No compatible network found!',
          HttpStatus.NOT_FOUND,
        );
      }

      if (network.platform?.toLowerCase() === 'evm') {
        const isValidAddress = ethers.isAddress(updateToken.address);

        if (!isValidAddress) {
          throw new HttpException(
            'Invalid address provided.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }

    return this.tokenService.updateTokenCms(id, updateToken);
  }

  async deleteToken(id: string) {
    return this.tokenService.deleteTokenCms(id);
  }

  //UPGRADE PACKAGES
  async createUpgradePackage(createUpgradePackage: CreateUpgradePackageDto) {
    return this.upgradePackageService.createPackageCms(createUpgradePackage);
  }

  async getUpgradePackages(getUpgradePackageData: GetUpgradePackageDto) {
    const result = await this.upgradePackageService.getListPackagesCms(
      getUpgradePackageData,
    );

    return {
      total: result.total,
      offset: result.offset,
      limit: result.limit,
      data: result.data.map((item: any) => ({
        _id: item._id,
        upgradeType: item.upgradeType,
        token: item.token,
        cost: item.cost,
        level: item.level,
        stats: item.stats,
        payWithTokenLimit: item.payWithTokenLimit,
      })),
    };
  }

  async getUpgradePackageById(id: string) {
    return await this.upgradePackageService.getPackageById(id);
  }

  async updateUpgradePackage(
    id: string,
    updateUpgradePackage: UpdateUpgradePackageDto,
  ) {
    const upgradePackage =
      await this.upgradePackageService.updateUpgradePackageCms(
        id,
        updateUpgradePackage,
      );

    if (upgradePackage.upgradeType === UpgradeType.MiningRate) {
      await this.userMiningService.updateUsersByLevels({
        rateLevel: upgradePackage.level,
        ratePerHour: upgradePackage.stats,
      });
    } else if (upgradePackage.upgradeType === UpgradeType.MaxStorage) {
      await this.userMiningService.updateUsersByLevels({
        storageLevel: upgradePackage.level,
        maxStorage: upgradePackage.stats,
        payWithTokenLimit: upgradePackage.payWithTokenLimit,
      });
    }

    return upgradePackage;
  }

  async deleteUpgradePackage(id: string) {
    return this.upgradePackageService.deleteUpgradePackageCms(id);
  }

  //INIT TASK
  async createInitTask(createInitTask: CreateInitTaskDto) {
    return this.initTaskService.createInitTaskCms(createInitTask);
  }

  async getInitTasks(getInitTaskData: GetInitTaskDto) {
    return this.initTaskService.getListInitTasksCms(getInitTaskData);
  }
  async getInitTaskById(id: string) {
    return this.initTaskService.getInitTaskById(id);
  }

  async updateInitTask(id: string, updateInitTask: UpdateInitTaskDto) {
    return this.initTaskService.updateInitTaskCms(id, updateInitTask);
  }

  async deleteInitTask(id: string) {
    return this.initTaskService.deleteInitTaskCms(id);
  }

  //REFERRER COMMISSION
  async createReferrerCommission(
    referrerCommission: CreateReferrerCommissionDto,
  ) {
    return this.referrerCommissionService.createReferrerCommissionCms(
      referrerCommission,
    );
  }

  async getReferrerCommissions(
    getReferrerCommissionData: GetReferrerCommissionDto,
  ) {
    const result =
      await this.referrerCommissionService.getReferrerCommissionCms(
        getReferrerCommissionData,
      );

    return {
      total: result.total,
      offset: result.offset,
      limit: result.limit,
      data: result.data.map((item: any) => ({
        _id: item._id,
        refName: item.referrerType?.name,
        referrerLevel: item.referrerLevel,
        commissionRate: item.commissionRate,
        description: item.description,
      })),
    };
  }

  async getReferrerCommissionById(id: string) {
    return this.referrerCommissionService.getReferrerCommissionById(id);
  }

  async updateReferrerCommission(
    id: string,
    referrerCommission: UpdateReferrerCommissionDto,
  ) {
    return this.referrerCommissionService.updateReferrerCommissionByIdCms(
      id,
      referrerCommission,
    );
  }

  async deleteReferrerCommission(id: string) {
    return this.referrerCommissionService.deleteReferrerCommissionCms(id);
  }

  //REFERRER TYPE
  async createReferrerType(referrerType: CreateReferrerTypeDto) {
    return this.referrerTypeService.createReferrerTypeCms(referrerType);
  }
  async getReferrerTypes(getReferrerTypeData: GetReferrerTypeDto) {
    const result =
      await this.referrerTypeService.getAllReferrerTypesCms(
        getReferrerTypeData,
      );

    return {
      total: result.total,
      offset: result.offset,
      limit: result.limit,
      data: result.data.map((item: any) => ({
        _id: item._id,
        name: item.name,
        description: item.description,
      })),
    };
  }

  async getReferrerTypeById(id: string) {
    return this.referrerTypeService.getReferrerTypeById(id);
  }

  async updateReferrerType(id: string, referrerType: UpdateReferrerTypeDto) {
    return this.referrerTypeService.updateReferrerTypeCms(id, referrerType);
  }

  async deleteReferrerType(id: string) {
    return this.referrerTypeService.deleteReferrerTypeCms(id);
  }

  //SPONSOR CONFIG
  async createSponsorConfig(sponsorConfig: CreateSponsorConfigDto) {
    return this.sponsorConfigService.createSponsorConfigCms(sponsorConfig);
  }

  async getSponsorConfigs(getSponsorConfigData: GetSponsorConfigDto) {
    return this.sponsorConfigService.getListSponsorConfigCms(
      getSponsorConfigData,
    );
  }

  async getSponsorConfigById(id: string) {
    return this.sponsorConfigService.getSponsorConfigById(id);
  }

  async updateSponsorConfig(id: string, sponsorConfig: UpdateSponsorConfigDto) {
    return this.sponsorConfigService.updateSponsorConfigByIdCms(
      id,
      sponsorConfig,
    );
  }

  async deleteSponsorConfig(id: string) {
    return this.sponsorConfigService.deleteSponsorConfigCms(id);
  }

  //USER LEVEL
  async updateUserLevel(id: string, updateLevel: UpdateUserLevelDto) {
    return this.userLevelService.updateUserLevelCms(id, updateLevel);
  }

  async getUserLevelById(id: string) {
    return this.userLevelService.getUserLevelById(id);
  }

  async getUsersLevel(getUserLevelData: GetUserLevelDto) {
    const userLevel =
      await this.userLevelService.getListUserLevelCms(getUserLevelData);

    const formattedData = userLevel.data.map((item) => ({
      _id: item._id,
      username: item.user.username,
      exp: item.exp,
      level: item.level,
      ref1Commission: item.ref1Commission,
      ref2Commission: item.ref2Commission,
    }));

    return {
      total: userLevel.total,
      offset: userLevel.offset,
      limit: userLevel.limit,
      data: formattedData,
    };
  }

  async deleteUserLevel(id: string) {
    return this.userLevelService.deleteUserLevelCms(id);
  }

  //USER TASK
  async createUserTask(createUserTask: CreateUserTaskDto) {
    return this.userTaskService.createUserTask(createUserTask);
  }

  async getUserTasks(getUserTaskData: GetUserTasksCmsDto) {
    return this.userTaskService.getUserTasksCms(getUserTaskData);
  }

  async getUserTaskById(id: string) {
    return this.userTaskService.getUserTaskById(id);
  }

  async updateUserTask(id: string, updateUserTask: UpdateUserTaskDto) {
    return this.userTaskService.updateUserTask(id, updateUserTask);
  }

  async deleteUserTask(id: string) {
    return this.userTaskService.deleteUserTask(id);
  }

  //AMBASSADOR
  async createAmbassadors(createAmbassadorData: CreateAmbasaadorDto) {
    return this.ambassadorService.createAmbassadorCms(createAmbassadorData);
  }

  async getAmbassadors(getAmbassadorData: GetAmbassadorDto) {
    const ambassadorData =
      await this.ambassadorService.getListAmbassadorsCms(getAmbassadorData);

    const formattedData = ambassadorData.data.map((item) => ({
      _id: item._id,
      name: item.name,
      description: item.description,
      images: item.images,
      status: item.status,
    }));

    return {
      total: ambassadorData.total,
      offset: ambassadorData.offset,
      limit: ambassadorData.limit,
      data: formattedData,
    };
  }

  async getAmbassadorById(ambassadorId: string) {
    return this.ambassadorService.getAmbassadorById(ambassadorId);
  }

  async updateAmbassador(
    ambassadorId: string,
    updateAmbassadorDto: UpdateAmbassadorDto,
  ) {
    return this.ambassadorService.updateAmbassadorCms(
      ambassadorId,
      updateAmbassadorDto,
    );
  }

  async deleteAmbassadors(ambassadorId: string) {
    return this.ambassadorService.deleteAmbassadorCms(ambassadorId);
  }

  //CAMPAIGN
  async createCampaign(createCampaignData: CreateCampaignDto) {
    return this.campaignService.createCampaignCms(createCampaignData);
  }

  async getCampaigns(getCampaignData: GetCampaignsDto) {
    const campaignData =
      await this.campaignService.getListCampaignsCms(getCampaignData);

    const formattedData = campaignData.data.map((item) => ({
      _id: item._id,
      name: item.name,
      images: item.images,
      status: item.status,
      startDate: item.startDate,
      endDate: item.endDate,
    }));

    return {
      total: campaignData.total,
      offset: campaignData.offset,
      limit: campaignData.limit,
      data: formattedData,
    };
  }

  async getCampaignById(campaignId: string) {
    return this.campaignService.getCampaignById(campaignId);
  }

  async updateCampaign(
    campaignId: string,
    updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.updateCampaignCms(
      campaignId,
      updateCampaignDto,
    );
  }

  async deleteCampaign(campaignId: string) {
    return this.campaignService.deleteCampaignCms(campaignId);
  }

  //REWARD TYPE
  async createRewardType(createRewardType: CreateRewardTypeDto) {
    return this.rewardTypeService.createRewardTypeCms(createRewardType);
  }

  async getRewardTypesCms(getRewardTypesData: GetRewardTypeDto) {
    const { total, offset, limit, data } =
      await this.rewardTypeService.getRewardTypesCms(getRewardTypesData);

    const dataWithChainPromises = data.map(async (item) => {
      const chainData = await this.networkService.getNetworkByChainId(
        item.chainId,
      );

      return {
        _id: item._id,
        name: item.name,
        type: item.type,
        chainId: item.chainId,
        image: item.image,
        isDeleted: item.isDeleted,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        token: item.token,
        chainData: {
          name: chainData.name,
          chainId: chainData.chainId,
          symbol: chainData.symbol,
          rpcUrl: chainData.rpcUrl,
          blockExplorer: chainData.blockExplorer,
          chainKey: chainData.chainKey,
          platform: chainData.platform,
          image: chainData.image,
          isDeleted: chainData.isDeleted,
          createdAt: chainData.createdAt,
          updatedAt: chainData.updatedAt,
          isSupported: chainData.isSupported,
          _id: chainData.id,
        },
      };
    });

    const dataWithChain = await Promise.all(dataWithChainPromises);

    return {
      total,
      offset,
      limit,
      data: dataWithChain,
    };
  }

  async getRewardTypeById(rewardTypeId: string) {
    return this.rewardTypeService.getRewardTypeById(rewardTypeId);
  }

  async updateRewardType(
    rewardTypeId: string,
    updateRewardType: UpdateRewardTypeDto,
  ) {
    return this.rewardTypeService.updateRewardTypeCms(
      rewardTypeId,
      updateRewardType,
    );
  }

  async deleteRewardType(rewardTypeId: string) {
    return this.rewardTypeService.deleteRewardTypeCms(rewardTypeId);
  }

  //CMS LOG
  async getCmsLogs(getLogsData: GetCmsLogsDto) {
    return this.cmsLogsService.getCmsLogs(getLogsData);
  }

  async getCmsLogById(id: string) {
    return this.cmsLogsService.getCmsLogById(id);
  }

  async uploadImage(
    image: Express.Multer.File,
    uploadImageData: UploadImageDto,
  ) {
    return this.imageService.uploadImage(
      image.buffer,
      image.originalname,
      uploadImageData?.compress,
    );
  }

  //REFERRER
  async getReferrerTree(getReferrerData: GetReferrerTreeDto) {
    return this.referrerService.getReferrerTreeCms(getReferrerData);
  }

  //SPONSOR LOG
  async getSponsorLogs(getSponsorLogsData: GetSponsorLogsDto) {
    const sponsorLogs =
      await this.sponsorLogService.getSponsorLogCms(getSponsorLogsData);

    const logsWithChainName = await Promise.all(
      sponsorLogs.data.map(async (log) => {
        const network = await this.networkService.getNetworkByChainId(
          log.chainId,
        );
        return {
          ...log,
          chainName: network?.name || 'Unknown Network',
        };
      }),
    );

    return {
      ...sponsorLogs,
      data: logsWithChainName,
    };
  }
  //USER MINING
  async getUserMining(getUserMiningData: GetUserMiningDto) {
    return this.userMiningService.getUserMiningCms(getUserMiningData);
  }

  //USER-SPONSORSHIP
  async getUserSponsorship(getUserSponsorshipData: GetUserSponsorshipsDto) {
    const userSponsorship =
      await this.userSponsorshipService.getUserSponsorshipCms(
        getUserSponsorshipData,
      );

    const sponsorshipsWithChainName = await Promise.all(
      userSponsorship.data.map(async (sponsorship) => {
        const network = await this.networkService.getNetworkByChainId(
          sponsorship.chainId,
        );
        return {
          ...sponsorship,
          chainName: network?.name || 'Unknown Network',
        };
      }),
    );

    return {
      ...userSponsorship,
      data: sponsorshipsWithChainName,
    };
  }

  //USER UPGRADE
  async getUserUpgrades(getUserUpgradesData: GetUserUpgradesDto) {
    return this.userUpgradeService.getUserUpgradesCms(getUserUpgradesData);
  }
  //USER WALLET
  async getUserWallets(getUserWalletsData: GetUserWalletsDto) {
    return this.userWalletService.getUserWalletsCms(getUserWalletsData);
  }

  // SEND MESSAGE
  async sendMessageToUsers(
    adminUser,
    userTarget: CMS_SEND_MESSAGE_TARGET,
    message: MessageFormat,
    option?: any,
  ) {
    switch (userTarget) {
      case CMS_SEND_MESSAGE_TARGET.ALL: {
        const allUsers = await this.userService.getUsersSendMessage();
        const userTelegramUids = allUsers.map((i) => i?.telegramUid);

        await Promise.all(
          userTelegramUids.map(async (uid: string) => {
            await this.bullMqService.addJobToQueue(
              QUEUE_CMS_SEND_MESSAGE,
              `send-message-to-${userTarget}-target-${uid}`,
              { userTelegramUid: uid, message },
            );
          }),
        );

        await this.cmsSendMessageService.createCmsSendMessage({
          adminUser: adminUser?.id,
          target: CMS_SEND_MESSAGE_TARGET.ALL,
          thumbnail: message?.thumbnail,
          content: message?.content,
          button: message?.button,
          userTargets: userTelegramUids,
        });

        break;
      }
      case CMS_SEND_MESSAGE_TARGET.SPECIFIC: {
        if (!option?.userIds) {
          console.log('[sendMessageToUsers] missing user specific!!');
          return false;
        }
        const userIds = uniq(option?.userIds);
        const listUsers = await this.userService.getUsersSendMessage({
          userIds,
        });
        const userTelegramUids = listUsers.map((i) => i?.telegramUid);

        await Promise.all(
          userTelegramUids.map(async (uid: string) => {
            await this.bullMqService.addJobToQueue(
              QUEUE_CMS_SEND_MESSAGE,
              `send-message-to-${userTarget}-target-${uid}`,
              { userTelegramUid: uid, message },
            );
          }),
        );

        await this.cmsSendMessageService.createCmsSendMessage({
          adminUser: adminUser?.id,
          target: CMS_SEND_MESSAGE_TARGET.SPECIFIC,
          thumbnail: message?.thumbnail,
          content: message?.content,
          button: message?.button,
          userTargets: userTelegramUids,
        });

        break;
      }
      case CMS_SEND_MESSAGE_TARGET.REGION:
        break;
      default:
        return false;
    }
    return true;
  }

  async getListCmsSendMessages(getSendMessageData: GetListSendMessagesDto) {
    return await this.cmsSendMessageService.getListCmsSendMessages(
      getSendMessageData,
    );
  }

  async getCmsSendMessageById(id: string) {
    return await this.cmsSendMessageService.getCmsSendMessageById(id);
  }

  //PINCODE FAILURES
  async getPincodeFailures(getPincodeFailuresData: GetPincodeFailuresDto) {
    return this.pincodeFailuresService.getPinCodeFailuresCms(
      getPincodeFailuresData,
    );
  }

  //USER CONFIG
  async getUserConfigs(getUserConfigsData: GetUserConfigDto) {
    return this.userConfigService.getUserConfigsCms(getUserConfigsData);
  }

  //USER TOKEN
  async getUserTokens(getUserTokensData: GetUserTokensDto) {
    return this.userTokenService.getUserTokensCms(getUserTokensData);
  }

  //DASHBOARD
  async getDashboardOverview(dateRange?: DateRangeDto) {
    const [totalUsers, claimedUsers, upgradedUsers, refStats] =
      await Promise.all([
        this.userService.countUsers(dateRange),
        this.claimTransactionService.countUniqueClaimUsers(dateRange),
        this.upgradeTransactionService.countUniqueUpgradeUsers(dateRange),
        this.userService.getReferralStatistics(dateRange),
      ]);
    return {
      totalUsers,
      claimedUsers,
      upgradedUsers,
      totalReferrers: refStats.totalReferrers,
    };
  }

  async getDashboardAcquisition(dateRange?: DateRangeDto) {
    const [newUsers, countryStatistics, activeUsers] = await Promise.all([
      this.userService.getNewUsers(dateRange),
      this.userService.getUserCountriesStatistics(dateRange),
      this.getActiveUsersByDay(dateRange),
    ]);

    return {
      newUsers,
      activeUsers,
      countryStatistics,
    };
  }

  private async getActiveUsersByDay(dateRange?: DateRangeDto) {
    try {
      const result = {};

      const endDate = dateRange?.endDate
        ? new Date(dateRange.endDate)
        : new Date();

      endDate.setHours(23, 59, 59, 999);

      const startDate = dateRange?.startDate
        ? new Date(dateRange.startDate)
        : (() => {
            const date = new Date(endDate);
            date.setDate(date.getDate() - 6);
            date.setHours(0, 0, 0, 0);
            return date;
          })();

      startDate.setHours(0, 0, 0, 0);

      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);

        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        nextDate.setHours(0, 0, 0, 0);

        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = currentDate.toLocaleString('default', { month: 'short' });
        const year = currentDate.toLocaleString('default', { year: 'numeric' });
        const dayLabel = `${day}/${month}/${year}`;

        const dailyActiveUsers = await this.getActiveUsers({
          startDate: currentDate.toISOString(),
          endDate: nextDate.toISOString(),
        });

        result[dayLabel] = dailyActiveUsers;
      }

      return result;
    } catch (error) {
      console.error('[getActiveUsersByDay] error:', error);
      return {};
    }
  }
  private async getActiveUsers(dateRange?: DateRangeDto) {
    const userIdsFromTransactions = await Promise.all([
      this.claimTransactionService.getUserIdsByDateRange(dateRange),
      this.upgradeTransactionService.getUserIdsByDateRange(dateRange),
      this.executeTransactionService.getUserIdsByDateRange(dateRange),
      this.claimTaskTransactionService.getUserIdsByDateRange(dateRange),
      this.referrerRewardTransactionService.getUserIdsByDateRange(dateRange),
    ]);

    const uniqueUserIds = new Set(userIdsFromTransactions.flat());
    return uniqueUserIds.size;
  }

  async getDashboardUserActivity(dateRange?: DateRangeDto) {
    const services = {
      claim: {
        service: this.claimTransactionService,
        countMethod: 'countClaimTransactions',
        statsMethod: 'getClaimTxPayFeeOptionStatistics',
      },
      upgrade: {
        service: this.upgradeTransactionService,
        countMethod: 'countUpgradeTransactions',
        statsMethod: 'getUpgradeTxPayFeeOptionStatistics',
      },
      claimTask: {
        service: this.claimTaskTransactionService,
        countMethod: 'countClaimTaskTransactions',
        statsMethod: 'getClaimTaskTxPayFeeOptionStatistics',
      },
    };

    const fetchStats = async (serviceConfig) => {
      const { service, countMethod, statsMethod } = serviceConfig;
      return Promise.all([
        service[countMethod](dateRange, false),
        service[countMethod](dateRange, true),
        service[statsMethod](dateRange, false),
        service[statsMethod](dateRange, true),
      ]);
    };

    const results = await Promise.all(
      Object.entries(services).map(async ([type, config]) => {
        const [count, dailyCount, payFeeStats, dailyPayFeeStats] =
          await fetchStats(config);
        return { type, count, dailyCount, payFeeStats, dailyPayFeeStats };
      }),
    );

    return results.reduce(
      (acc, { type, count, dailyCount, payFeeStats, dailyPayFeeStats }) => {
        acc.overview.totalTransactions[type] = count;

        Object.entries(payFeeStats).forEach(([method, value]) => {
          acc.overview.paymentMethods[method] =
            (acc.overview.paymentMethods[method] || 0) + value;
        });

        acc.dailyStats.transactions[type] = dailyCount;

        Object.entries(dailyPayFeeStats).forEach(([month, stats]) => {
          Object.entries(stats).forEach(([method, value]) => {
            if (!acc.dailyStats.paymentMethods[method]) {
              acc.dailyStats.paymentMethods[method] = {};
            }
            acc.dailyStats.paymentMethods[method][month] =
              (acc.dailyStats.paymentMethods[method][month] || 0) + value;
          });
        });

        return acc;
      },
      {
        overview: {
          totalTransactions: {},
          paymentMethods: {
            sponsored: 0,
            payWithToken: 0,
            default: 0,
          },
        },
        dailyStats: {
          transactions: {},
          paymentMethods: {
            sponsored: {},
            payWithToken: {},
            default: {},
          },
        },
      },
    );
  }

  async getDashboardUpgrades(dto: GetLevelStatsDto) {
    return Promise.all([
      this.userMiningService.getAverageLevels(),
      this.userMiningService.getLevelStats(dto),
    ]).then(([averageLevel, levelStats]) => ({
      averageLevel,
      levelStats,
    }));
  }

  async getDashboardReferralProgram(
    query: GetDashboardReferralDto,
    dateRange?: DateRangeDto,
  ) {
    try {
      const [refStats, expStats] = await Promise.all([
        this.userService.getReferralStatistics(dateRange),
        this.userLevelService.getExpStats(10),
      ]);

      const expRequires = await Promise.all(
        expStats.levelStats.map((stat) =>
          this.levelConfigService
            .getLevelConfigByLevel(stat.level)
            .then((config) => ({
              level: stat.level,
              experienceRequired: config?.experienceRequire || 0,
            })),
        ),
      );

      let topReferrersWithExp = [];
      if (query.type === DashboardRefTypeEnum.TOP_REF) {
        topReferrersWithExp = await Promise.all(
          refStats.topReferrers.map(async (referrer) => {
            const userLevel = await this.userLevelService.getUserLevelByUserId(
              referrer.user._id,
            );
            return {
              ...referrer,
              exp: userLevel?.exp || 0,
              level: userLevel?.level || 1,
            };
          }),
        );
      }

      const levelStats = expStats.levelStats.map((stat) => ({
        ...stat,
        experienceRequired:
          expRequires.find((req) => req.level === stat.level)
            ?.experienceRequired || 0,
      }));

      return {
        totalReferrers: refStats.totalReferrers,
        totalReferrals: refStats.totalReferrals,
        ...(query.type === DashboardRefTypeEnum.TOP_EXP
          ? { topExp: expStats.topUsers }
          : { topReferrers: topReferrersWithExp }),
        averageLevel: expStats.averageLevel,
        levelStats,
      };
    } catch (error) {
      console.error('Error in getDashboardReferralProgram:', error);
      throw new HttpException(
        'Error getting dashboard referral program data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getDashboardSocialEngagement(
    getUserTasksStatsDto: GetUserTasksStatsDto,
    dateRange?: DateRangeDto,
  ) {
    return Promise.all([
      this.userTaskService.getUserTaskStats(dateRange),
      this.userTaskService.getUserTaskStatsByGroup(
        getUserTasksStatsDto,
        dateRange,
      ),
    ]).then(([userTaskStats, userTaskStatsByGroup]) => ({
      userTaskStats,
      userTaskStatsByGroup,
    }));
  }

  // SEND MESSAGES FAILED
  async getSendMessagesFailedById(id: string) {
    return await this.sendMessageFailedService.getSendMessagesFailedById(id);
  }
  async getListSendMessagesFailed(getData: GetListSendMessagesFailedDto) {
    return await this.sendMessageFailedService.getListSendMessagesFailed(
      getData,
    );
  }
  async getSendMessagesFailedCount() {
    return await this.sendMessageFailedService.getSendMessagesFailedCount();
  }
  //SCAN LOG CONFIGS

  async getListScanLogConfigs(getData: PaginationQueriesDto) {
    return await this.scanLogConfigService.getListScanLogConfigCms(getData);
  }

  async getScanLogConfigById(id: string) {
    return await this.scanLogConfigService.getScanLogConfigById(id);
  }

  async createScanLogConfig(createData: CreateScanLogConfigDto) {
    const checkExist = await this.scanLogConfigModel.findOne({
      topic: createData?.topic,
      isDeleted: false,
    });

    if (checkExist) {
      throw new HttpException(
        'Duplicate topic: ${createData.topic} with name ${checkExist.name}',
        HttpStatus.CONFLICT,
      );
    }
    return await this.scanLogConfigService.createScanLogConfig(createData);
  }

  async updateScanLogConfig(id: string, updateData: UpdateScanLogConfigDto) {
    try {
      const checkExist = await this.scanLogConfigModel.findOne({
        topic: updateData?.topic,
        _id: { $ne: id },
        isDeleted: false,
      });

      if (checkExist) {
        throw new HttpException(
          `Duplicate topic: ${updateData.topic} with name ${checkExist.name}`,
          HttpStatus.CONFLICT,
        );
      }

      const config = await this.scanLogConfigModel.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!config) {
        throw new HttpException('Scan config not found!', HttpStatus.NOT_FOUND);
      }
      return await this.scanLogConfigService.updateScanLogConfig(
        id,
        updateData,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update scan log config',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteScanLogConfig(id: string) {
    return await this.scanLogConfigService.deleteScanLogConfig(id);
  }

  //
  async getListClients(getData: PaginationQueriesDto) {
    return await this.clientService.getListClientCms(getData);
  }

  async getClientById(id: string) {
    return await this.clientService.getClientById(id);
  }

  async createClient(createData: CreateClientDto) {
    return await this.clientService.createClient(createData);
  }

  async updateClient(id: string, updateData: UpdateClientDto) {
    return await this.clientService.updateClient(id, updateData);
  }

  async deleteClient(id: string) {
    return await this.clientService.deleteClient(id);
  }

  async getListClientRoles(getData: PaginationQueriesDto) {
    return await this.clientRoleService.getListClientRolesCms(getData);
  }

  async getClientRoleById(id: string) {
    return await this.clientRoleService.getClientRoleById(id);
  }

  async createClientRole(createData: CreateClientRoleDto) {
    return await this.clientRoleService.createClientRole(createData);
  }

  async updateClientRole(id: string, updateData: UpdateClientRoleDto) {
    return await this.clientRoleService.updateClientRole(id, updateData);
  }

  async deleteClientRole(id: string) {
    return await this.clientRoleService.deleteClientRole(id);
  }

  async getListClientPermissions(getData: PaginationQueriesDto) {
    return await this.clientPermissionService.getListClientPermissionsCms(
      getData,
    );
  }

  async getClientPermisisonById(id: string) {
    return await this.clientPermissionService.getClientPermissionById(id);
  }

  async createClientPermission(createData: CreateClientPermissionDto) {
    return await this.clientPermissionService.createClientPermission(
      createData,
    );
  }

  async updateClientPermission(
    id: string,
    updateData: UpdateClientPermissionDto,
  ) {
    return await this.clientPermissionService.updateClientPermission(
      id,
      updateData,
    );
  }

  async deleteClientPermission(id: string) {
    return await this.clientPermissionService.deleteClientPermission(id);
  }
}
